import { DestroyRef, Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, BehaviorSubject, switchMap, from, noop } from 'rxjs';
import { registerLocaleData } from '@angular/common';

import { Language } from '@lib/enums/language.enum';
import { StorageKeys } from '@lib/enums/storage-keys.enum';
import { SUPPORTED_LANGUAGES } from '@lib/consts/languages.const';
import { Router, RouteReuseStrategy } from '@angular/router';
import { LOCALE_ID, Provider } from '@angular/core';

export const getLanguage = (): Language => {
    const stored = localStorage.getItem(StorageKeys.SELECTED_LANGUAGE);
    if (stored) {
        return stored as Language;
    }
    const browser = navigator.language || (navigator as any).userLanguage;
    if (browser) {
        const lang = (browser as string).split('-')[0];
        if (Object.keys(SUPPORTED_LANGUAGES).includes(lang)) {
            return lang as Language;
        }
    }
    return Language.EN;
};

@Injectable({
    providedIn: 'root',
})
export class LanguageService {
    // Get language from localStorage and update the service selectedLanguage var
    selectedLanguage$ = new BehaviorSubject<Language>(getLanguage());

    private _router = inject(Router);
    private _routeReuseStrategy = inject(RouteReuseStrategy);
    private _translate = inject(TranslateService);
    private _destroyRef = inject(DestroyRef);

    async initialize(): Promise<void> {
        const language = getLanguage();
        await this.registerLocale(language);
    }

    getSelectedLanguage(): Observable<Language> {
        return this.selectedLanguage$;
    }

    setSelectedLanguage(language: Language): void {
        this.selectedLanguage$.next(language as Language);
        this._translate
            .use(language)
            .pipe(
                switchMap(() => from(this.setLocale(language as Language))),
                takeUntilDestroyed(this._destroyRef),
            )
            .subscribe();
    }

    private async setLocale(language: Language): Promise<void> {
        localStorage.removeItem(StorageKeys.SELECTED_LANGUAGE);
        localStorage.setItem(StorageKeys.SELECTED_LANGUAGE, language);
        await this.registerLocale(language);
        await this._refreshApplicationLocaleId();
    }

    private async registerLocale(language: Language) {
        switch (language) {
            case Language.SI: {
                const localeSI = await import('@angular/common/locales/sl');
                registerLocaleData(localeSI.default, Language.SI);
                break;
            }
            case Language.DE: {
                const localeDE = await import('@angular/common/locales/de');
                registerLocaleData(localeDE.default, Language.DE);
                break;
            }
            case Language.EN:
            default: {
                const localeEN = await import('@angular/common/locales/en');
                registerLocaleData(localeEN.default, Language.EN);
                break;
            }
        }
    }

    /**
     * Re-navigate to current URL, forcing all directives to re-create.
     */
    private async _refreshApplicationLocaleId(): Promise<void> {
        const fnShouldReuseRoute = this._routeReuseStrategy;
        this._routeReuseStrategy.shouldReuseRoute = (): boolean => false;
        this._router.navigated = false;
        await this._router.navigateByUrl(this._router.url).catch(noop);
        this._routeReuseStrategy = fnShouldReuseRoute;
    }
}

export class LocaleId extends String {
    private _languageService = inject(LanguageService);

    override toString(): string {
        return this._languageService.selectedLanguage$.getValue();
    }

    override valueOf(): string {
        return this.toString();
    }
}

export const LOCALE_PROVIDER: Provider = {
    provide: LOCALE_ID,
    useClass: LocaleId,
    deps: [LanguageService],
};
