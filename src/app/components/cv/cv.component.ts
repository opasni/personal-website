import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

import { User } from 'src/app/classes/user.class';
import { USER_DATA } from 'src/app/consts/user.const';
import { Language } from 'src/app/enums/language.enum';
import { Theme } from 'src/app/enums/theme.enum';
import { SkillsModule } from 'src/app/modules/skills/skills.module';
import { LanguageService, getLanguage } from 'src/app/services/language.service';
import { ThemeService, getTheme } from 'src/app/services/theme.service';
import { ExperienceComponent } from '../experience/experience.component';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    CommonModule,
    ExperienceComponent,
    SkillsModule,
    TranslateModule,
  ]
})
export class CVComponent implements OnInit {

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
