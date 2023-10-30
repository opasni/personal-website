import { Injectable, OnDestroy, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject, finalize, takeUntil, Observable, BehaviorSubject } from 'rxjs';
import { registerLocaleData } from '@angular/common';

import localeDe from '@angular/common/locales/de';
import localeEn from '@angular/common/locales/en';
import localeDeExtra from '@angular/common/locales/extra/de';
import localeEnExtra from '@angular/common/locales/extra/en';

import { Language } from '@lib/enums/language.enum';
import { StorageKeys } from '@lib/enums/storage-keys.enum';
import { SUPPORTED_LANGUAGES } from '@lib/consts/languages.const';

export const getLanguage = () => {
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
}

@Injectable({
    providedIn: 'root'
})
export class LanguageService implements OnDestroy {
    // Get language from localStorage and update the service selectedLanguage var
    selectedLanguage$ = new BehaviorSubject<Language>(getLanguage());

    private _unsubscribe = new Subject<void>();
    private _translate = inject(TranslateService);

    ngOnDestroy(): void {
        this._unsubscribe.next();
        this._unsubscribe.complete();
    }

    initialize(): Language {
        const language = getLanguage();
        this.registerLocale(language);
        return language;
    }

    getSelectedLanguage(): Observable<Language> {
        return this.selectedLanguage$;
    }

    setSelectedLanguage(language: Language) {
        this.selectedLanguage$.next(language as Language);
        this._translate.use(language)
            .pipe(
                takeUntil(this._unsubscribe),
                finalize(() => {
                    this.setLocale(language as Language);
                })
            ).subscribe();
    }

    private setLocale(language: Language) {
        localStorage.setItem(StorageKeys.SELECTED_LANGUAGE, language);
    }

    private registerLocale(language: Language) {
        switch (language) {
            case Language.DE:
                registerLocaleData(localeDe, Language.DE, localeDeExtra);
                break;
            case Language.EN:
            default:
                registerLocaleData(localeEn, Language.EN, localeEnExtra);
                break;
        }

    }
}
