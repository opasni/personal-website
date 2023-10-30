import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, QueryList, ViewChildren, ViewEncapsulation, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, tap } from 'rxjs';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Classes
import { User } from '@lib/classes/user.class';
// Enums
import { Language } from '@lib/enums/language.enum';
import { Theme } from '@lib/enums/theme.enum';
// Components
import { ExperienceComponent } from '@pages/experience/experience.component';
import { SkillsOverviewComponent } from '@lib/components/skills-overview/skills-overview.component';
// Services
import { ThemeService, getTheme } from '@lib/services/theme.service';
import { LanguageService, getLanguage } from '@lib/services/language.service';
import { UserApiService } from '@lib/services/user.service';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    CommonModule,
    ExperienceComponent,
    SkillsOverviewComponent,
    TranslateModule,
  ]
})
export class CVComponent implements OnInit {
  @ViewChildren('sheet') sheetElements!: QueryList<ElementRef<HTMLBodyElement>>;

  public userData$ = new Observable<User>();
  public theme!: Theme;
  public lang!: Language;
  public backgroundColor = '#727272';

  private userService = inject(UserApiService);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    const themeService = inject(ThemeService);
    this.theme = getTheme() ?? Theme.Light;
    themeService.setTheme(this.theme);
    this.checkTheme(themeService);

    const languageService = inject(LanguageService);
    this.lang = getLanguage() ?? Language.EN;
    languageService.setSelectedLanguage(this.lang);
    this.checkLanguage(languageService);

		document.body.style.overflowY = 'scroll';
    document.body.style.backgroundColor = this.backgroundColor;
    this.setUser();
  }

  public async downloadAsPDF() {
    let pdf = new jsPDF('p', 'mm', 'a4', false);

    if (!this.sheetElements.first) {
      return;
    }

    let pageCount = 0;
    for (const sheet of this.sheetElements) {
      pageCount++;
      await html2canvas(sheet.nativeElement, {
        scale: 6
      }).then((canvas) => {
        const FILE_URI = canvas.toDataURL('image/png', 1.0);
        pdf.addImage(FILE_URI, 'PNG', 0, 0, 210, 298, `cv_${pageCount}`, 'FAST');
      });
    }

    pdf.save(`CV_CrtHarej_${this.lang.toUpperCase()}.pdf`);
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

  private setUser() {
    let password = localStorage.getItem('PASSWORD');
    if (password == null || password === '') {
      const message = this.lang === Language.DE ? "Passwort einfügen" : this.lang === Language.SI ? "Vnesite geslo" : "Insert Password";
      password = prompt(message);
    }
    this.userData$ = this.userService.getUserData(password)
      .pipe(tap(user => {
        if (user.email != null) {
          localStorage.setItem('PASSWORD', password ?? '');
        }
      }));
  }
}
