import { Component, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

// Classes
import { Lookup } from '@lib/classes/lookup.class';
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
import { TranslatePipe } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HoverImageDirective } from '@lib/directives/hover-image/hover-image.directive';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [CommonModule, HoverImageDirective, RouterModule, TranslatePipe],
})
export class ProfileComponent {
    public date = new Date();

    private _supportedLanguages = Object.keys(SUPPORTED_LANGUAGES);
    private _supportedThemes = Object.keys(SUPPORTED_THEMES);

    private _userService = inject(UserApiService);
    private _languageService = inject(LanguageService);
    private _themeService = inject(ThemeService);

    public readonly userData = toSignal(this._userService.getUserData(null));
    public readonly selectedLanguage = computed<Lookup>(
        () => SUPPORTED_LANGUAGES[this._languageService.selectedLanguage()],
    );
    public readonly selectedTheme = computed<Lookup>(() => SUPPORTED_THEMES[this._themeService.selectedTheme()]);

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
