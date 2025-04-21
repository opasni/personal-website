import { Component, OnInit, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

// Classes
import { Lookup } from '@lib/classes/lookup.class';
import { User } from '@lib/classes/user.class';
// Constants
import { SUPPORTED_LANGUAGES } from '@lib/consts/languages.const';
import { SUPPORTED_THEMES } from '@lib/consts/themes.const';
// Enums
import { Language } from '@lib/enums/language.enum';
import { Theme } from '@lib/enums/theme.enum';
// Services
import { LanguageService } from '@lib/services/language.service';
import { ThemeService } from '@lib/services/theme.service';
import { UserApiService } from '@lib/services/user.service';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HoverImageDirective } from '@lib/directives/hover-image/hover-image.directive';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    imports: [CommonModule, HoverImageDirective, RouterModule, TranslateModule],
})
export class ProfileComponent implements OnInit {
    public selectedLanguage$ = new Observable<Lookup>();
    public selectedTheme$ = new Observable<Lookup>();
    public userData$ = new Observable<User>();
    public date = new Date();

    private _supportedLanguages = Object.keys(SUPPORTED_LANGUAGES);
    private _supportedThemes = Object.keys(SUPPORTED_THEMES);

    private _userService = inject(UserApiService);
    private _languageService = inject(LanguageService);
    private _themeService = inject(ThemeService);

    ngOnInit(): void {
        this.selectedLanguage$ = this._languageService
            .getSelectedLanguage()
            .pipe(map((lang) => SUPPORTED_LANGUAGES[lang]));
        this.selectedTheme$ = this._themeService.selectedTheme.pipe(map((theme) => SUPPORTED_THEMES[theme]));
        this.userData$ = this._userService.getUserData(null);
    }

    changeLanguage(language: string): void {
        const index = this._supportedLanguages.findIndex((i) => i === language) + 1;
        const next = this._supportedLanguages[index % this._supportedLanguages.length];
        this._languageService.setSelectedLanguage(next as Language);
    }

    toggleTheme(theme: string): void {
        const index = this._supportedThemes.findIndex((i) => i === theme) + 1;
        const next = this._supportedThemes[index % this._supportedThemes.length];
        this._themeService.setTheme(next as Theme);
    }
}
