import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslationObject } from '@ngx-translate/core';
import { Observable, catchError, of, shareReplay, switchMap } from 'rxjs';

type I18nManifest = Record<string, string>;

/**
 * Translate loader that respects a content-hashed filename map.
 *
 * Fetches `<prefix>manifest.json` once (lazily, shared) and uses it to resolve
 * a language code to the hashed filename produced by `scripts/hash-i18n.mjs`.
 * Falls back to `<lang>.json` when the manifest is missing (e.g. local dev).
 */
export class HashedTranslateLoader implements TranslateLoader {
    private _manifest$?: Observable<I18nManifest>;

    constructor(
        private readonly _http: HttpClient,
        private readonly _prefix: string,
    ) {}

    getTranslation(lang: string): Observable<TranslationObject> {
        return this._loadManifest().pipe(
            switchMap((manifest) => {
                const filename = manifest[lang] ?? `${lang}.json`;
                return this._http.get<TranslationObject>(`${this._prefix}${filename}`);
            }),
        );
    }

    private _loadManifest(): Observable<I18nManifest> {
        if (!this._manifest$) {
            this._manifest$ = this._http.get<I18nManifest>(`${this._prefix}manifest.json`).pipe(
                catchError(() => of({} as I18nManifest)),
                shareReplay(1),
            );
        }
        return this._manifest$;
    }
}
