import { Component, ElementRef, OnInit, QueryList, ViewChildren, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Language } from '@lib/enums/language.enum';
import { Theme } from '@lib/enums/theme.enum';
import { LanguageService, getLanguage } from '@lib/services/language.service';
import { ThemeService, getTheme } from '@lib/services/theme.service';
import { PrintService } from '@lib/services/print.service';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { LoaderService } from '@lib/services/loader.service';

@Component({
  selector: 'app-export-backbone',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, LoadingSpinnerComponent, RouterModule],
  templateUrl: './export-backbone.component.html',
  styleUrls: ['./export-backbone.component.scss']
})
export class ExportBackboneComponent implements OnInit {
  @ViewChildren('sheet') sheetElements!: QueryList<ElementRef<HTMLBodyElement>>;
  public theme!: Theme;
  public lang!: Language;
  public backgroundColor = '#727272';

  private languageService = inject(LanguageService);
  private loaderService = inject(LoaderService);
  private printService = inject(PrintService);
  private route = inject(ActivatedRoute);
  private themeService = inject(ThemeService);

  ngOnInit(): void {
    this.theme = getTheme() ?? Theme.Light;
    this.themeService.setTheme(this.theme);
    this.checkTheme(this.themeService);

    this.lang = getLanguage() ?? Language.EN;
    this.languageService.setSelectedLanguage(this.lang);
    this.checkLanguage(this.languageService);

		document.body.style.overflowY = 'scroll';
    document.body.style.backgroundColor = this.backgroundColor;
  }


  public async downloadAsPDF() {
    this.loaderService.setLoading(true);
    await this.printService.printPdf();
    this.loaderService.setLoading(false);
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

