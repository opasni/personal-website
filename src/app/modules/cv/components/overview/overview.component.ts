import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';

import { User } from 'src/app/classes/user.class';
import { USER_DATA } from 'src/app/consts/user.const';
import { Language } from 'src/app/enums/language.enum';
import { Theme } from 'src/app/enums/theme.enum';
import { LanguageService, getLanguage } from 'src/app/services/language.service';
import { ThemeService, getTheme } from 'src/app/services/theme.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  public userData$ = new Observable<User>();
  public theme: Theme;
  public lang: Language;
  public backgroundColor = '#727272';

  constructor(
    private route: ActivatedRoute,
    languageService: LanguageService,
    themeService: ThemeService
  ) {
    this.theme = getTheme() ?? Theme.Light;
    themeService.setTheme(this.theme);
    this.checkTheme(themeService);
    this.lang = getLanguage() ?? Language.EN;
    languageService.setSelectedLanguage(this.lang);
    this.checkLanguage(languageService);
  }

  ngOnInit(): void {
		document.body.style.overflowY = 'scroll';
		document.body.style.backgroundColor = this.backgroundColor;
    this.userData$ = of(USER_DATA);
  }

  private checkTheme(themeService: ThemeService) {
    const localTheme = this.route.snapshot.queryParamMap.get('theme') as Theme;
    if (localTheme && this.theme !== localTheme) {
      themeService.setTheme(localTheme);
      this.theme = localTheme;
    }
  }

  private checkLanguage(languageService: LanguageService) {
    const localLang = this.route.snapshot.queryParamMap.get('lang') as Language;
    if (localLang && this.lang !== localLang) {
      languageService.setSelectedLanguage(localLang);
      this.lang = localLang;
    }
  }
}
