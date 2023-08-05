import { Injectable, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject, finalize, takeUntil, Observable, BehaviorSubject } from 'rxjs';
import { registerLocaleData } from '@angular/common';

import localeDe from '@angular/common/locales/de';
import localeEn from '@angular/common/locales/en';
import localeDeExtra from '@angular/common/locales/extra/de';
import localeEnExtra from '@angular/common/locales/extra/en';

import { Language } from 'src/app/enums/language.enum';
import { StorageKeys } from 'src/app/enums/storage-keys.enum';
import { SUPPORTED_LANGUAGES } from 'src/app/consts/languages.const';

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

    selectedLanguage$ = new BehaviorSubject<Language>(Language.EN);

    private unsubscribe$ = new Subject<void>();

    constructor(private translate: TranslateService) {
        // Get language from localStorage and update the service selectedLanguage var
        this.selectedLanguage$.next(
            getLanguage()
        );
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
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
        this.translate.use(language)
            .pipe(
                takeUntil(this.unsubscribe$),
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
