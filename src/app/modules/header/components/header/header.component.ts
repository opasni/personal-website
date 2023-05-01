import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, map, of } from 'rxjs';
import { Lookup } from 'src/app/modules/share/classes/lookup.class';
import { User } from 'src/app/modules/share/classes/user.class';
import { SUPPORTED_LANGUAGES } from 'src/app/modules/share/consts/languages.const';
import { Language } from 'src/app/modules/share/enums/language.enum';
import { AppSettingsService } from 'src/app/services/app-settings.service';
import { LanguageService } from 'src/app/services/language.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
	public cookie: any;
	public isMenuOpen = false;
	public squadCheckToolOpen = true;
    public selectedLanguage$ = new Observable<Lookup>();

	Language = Language;

	public userData$ = new Observable<User>();

    private _supportedLanguages = Object.keys(SUPPORTED_LANGUAGES);
	private unsubscribe$ = new Subject<void>();

	constructor(
        private applicationSettings: AppSettingsService,
		private languageService: LanguageService
    ) { }

    ngOnInit(): void {
        this.loadCookie();
        this.selectedLanguage$ = this.languageService.getSelectedLanguage()
            .pipe(map(lang => SUPPORTED_LANGUAGES[lang]));
        this.setUserObservable();
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}

	toggleMenu() {
		this.isMenuOpen = !this.isMenuOpen;
	}

    changeLanguage(language: string) {
        const index = this._supportedLanguages.findIndex(i => i === language) + 1;
        const next = this._supportedLanguages[index % this._supportedLanguages.length];
		this.languageService.setSelectedLanguage(next as Language);
	}

	private loadCookie(): void {
        this.cookie = this.applicationSettings.loadCookieData();
	}

	private setUserObservable() {
		this.userData$ = of(new User({
            firstName: 'Črt',
            lastName: 'Harej',
            imagePath: ''
        }));
	}
}
