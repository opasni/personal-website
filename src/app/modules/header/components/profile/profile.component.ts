import { Component, OnInit, inject } from '@angular/core';
import { Observable, map, of } from 'rxjs';

// Classes
import { Lookup } from 'src/app/classes/lookup.class';
import { User } from 'src/app/classes/user.class';
// Constants
import { SUPPORTED_LANGUAGES } from 'src/app/consts/languages.const';
import { SUPPORTED_THEMES } from 'src/app/consts/themes.const';
// Enums
import { Language } from 'src/app/enums/language.enum';
import { Theme } from 'src/app/enums/theme.enum';
// Services
import { LanguageService } from 'src/app/services/language.service';
import { ThemeService } from 'src/app/services/theme.service';
import { UserApiService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public selectedLanguage$ = new Observable<Lookup>();
  public selectedTheme$ = new Observable<Lookup>();
  public userData$ = new Observable<User>();

  private _supportedLanguages = Object.keys(SUPPORTED_LANGUAGES);
  private _supportedThemes = Object.keys(SUPPORTED_THEMES);

  private userService = inject(UserApiService);
  private languageService = inject(LanguageService);
  private themeService = inject(ThemeService);

  ngOnInit(): void {
    this.selectedLanguage$ = this.languageService.getSelectedLanguage()
      .pipe(map(lang => SUPPORTED_LANGUAGES[lang]));
    this.selectedTheme$ = this.themeService.selectedTheme
      .pipe(map(theme => SUPPORTED_THEMES[theme]));
      this.userData$ = this.userService.getUserData(null);
  }

  changeLanguage(language: string) {
    const index = this._supportedLanguages.findIndex(i => i === language) + 1;
    const next = this._supportedLanguages[index % this._supportedLanguages.length];
    this.languageService.setSelectedLanguage(next as Language);
  }

  toggleTheme(theme: string) {
    const index = this._supportedThemes.findIndex(i => i === theme) + 1;
    const next = this._supportedThemes[index % this._supportedThemes.length];
    this.themeService.setTheme(next as Theme);
  }
}
