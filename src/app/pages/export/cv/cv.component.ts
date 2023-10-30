import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren, ViewEncapsulation, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, tap } from 'rxjs';

// Classes
import { User } from '@lib/classes/user.class';
// Enums
import { Language } from '@lib/enums/language.enum';
// Components
import { ExperienceComponent } from '@pages/experience/experience.component';
import { SkillsOverviewComponent } from '@lib/components/skills-overview/skills-overview.component';
// Services
import { LanguageService } from '@lib/services/language.service';
import { UserApiService } from '@lib/services/user.service';
import { PrintService } from '@lib/services/print.service';

@Component({
  selector: 'app-cv',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss'],
  imports: [
    CommonModule,
    ExperienceComponent,
    SkillsOverviewComponent,
    TranslateModule,
  ]
})
export class CVComponent implements OnInit, AfterViewInit {
  @ViewChildren('sheet') sheetElements!: QueryList<ElementRef<HTMLBodyElement>>;

  public userData$ = new Observable<User>();
  public lang!: Language;

  private userService = inject(UserApiService);
  private printService = inject(PrintService);
  private languageService = inject(LanguageService);

  ngOnInit(): void {
    this.lang = this.languageService.selectedLanguage$.getValue();
    this.setUser();
  }

  ngAfterViewInit(): void {
    this.printService.sheetElements = this.sheetElements;
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
