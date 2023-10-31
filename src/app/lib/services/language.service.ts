import { DestroyRef, Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, BehaviorSubject, switchMap, from } from 'rxjs';
import { registerLocaleData } from '@angular/common';

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
export class LanguageService {
	// Get language from localStorage and update the service selectedLanguage var
	selectedLanguage$ = new BehaviorSubject<Language>(getLanguage());

	private _translate = inject(TranslateService);
	private _destroyRef = inject(DestroyRef);

	async initialize(): Promise<Language> {
		const language = getLanguage();
		await this.registerLocale(language);
		return language;
	}

	getSelectedLanguage(): Observable<Language> {
		return this.selectedLanguage$;
	}

	setSelectedLanguage(language: Language) {
		this.selectedLanguage$.next(language as Language);
		this._translate.use(language)
			.pipe(
				switchMap(() => from(this.setLocale(language as Language))),
				takeUntilDestroyed(this._destroyRef),
			)
			.subscribe();
	}

	private async setLocale(language: Language): Promise<void> {
		localStorage.setItem(StorageKeys.SELECTED_LANGUAGE, language);
		await this.registerLocale(language);
	}

	private async registerLocale(language: Language) {
		switch (language) {
			case Language.SI:
				const localeSI = await import('@angular/common/locales/si');
				registerLocaleData(localeSI.default, Language.SI);
				break;
			case Language.DE:
				const localeDE = await import('@angular/common/locales/de');
				registerLocaleData(localeDE, Language.DE);
				break;
			case Language.EN:
			default:
				const localeEN = await import('@angular/common/locales/en');
				registerLocaleData(localeEN, Language.EN);
				break;
		}
	}
}

