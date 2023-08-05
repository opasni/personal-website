import { Component, OnInit } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Lookup } from 'src/app/modules/share/classes/lookup.class';
import { User } from 'src/app/modules/share/classes/user.class';
import { SUPPORTED_LANGUAGES } from 'src/app/modules/share/consts/languages.const';
import { SUPPORTED_THEMES } from 'src/app/modules/share/consts/themes.const';
import { Language } from 'src/app/modules/share/enums/language.enum';
import { Theme } from 'src/app/modules/share/enums/theme.enum';
import { LanguageService } from 'src/app/services/language.service';
import { ThemeService } from 'src/app/services/theme.service';

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

  constructor(
    private languageService: LanguageService,
    private readonly themeService: ThemeService
  ) { }

  ngOnInit(): void {
    this.selectedLanguage$ = this.languageService.getSelectedLanguage()
      .pipe(map(lang => SUPPORTED_LANGUAGES[lang]));
    this.selectedTheme$ = this.themeService.selectedTheme
      .pipe(map(theme => SUPPORTED_THEMES[theme]));
    this.setUserObservable();
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

  private setUserObservable() {
    this.userData$ = of(new User({
      firstName: 'Črt',
      lastName: 'Harej',
      nickName: 'N9NYM0',
      imagePath: ''
    }));
  }
}
