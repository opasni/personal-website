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
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-export-backbone',
    encapsulation: ViewEncapsulation.None,
    imports: [CommonModule, LoadingSpinnerComponent, RouterModule, TranslateModule],
    templateUrl: './export-backbone.component.html',
    styleUrls: ['./export-backbone.component.scss'],
    providers: [PrintService],
})
export class ExportBackboneComponent implements OnInit {
    @ViewChildren('sheet') sheetElements!: QueryList<ElementRef<HTMLBodyElement>>;
    public theme!: Theme;
    public lang!: Language;
    public backgroundColor = '#727272';

    private _languageService = inject(LanguageService);
    private _loaderService = inject(LoaderService);
    private _printService = inject(PrintService);
    private _route = inject(ActivatedRoute);
    private _themeService = inject(ThemeService);

    ngOnInit(): void {
        this._checkTheme();
        this._checkLanguage();

        document.body.style.overflowY = 'scroll';
        document.body.style.backgroundColor = this.backgroundColor;
    }

    public async downloadAsPDF(): Promise<void> {
        this._loaderService.setLoading(true);
        await this._printService.printPdf();
        this._loaderService.setLoading(false);
    }

    private _checkTheme() {
        this.theme = getTheme() ?? Theme.Light;
        const localTheme = this._route.snapshot.queryParamMap.get('theme') as Theme;
        if (localTheme && this.theme !== localTheme) {
            this.theme = localTheme;
        }
        this._themeService.setTheme(this.theme);
    }

    private _checkLanguage() {
        this.lang = getLanguage() ?? Language.EN;
        const localLang = this._route.snapshot.queryParamMap.get('lang') as Language;
        if (localLang && this.lang !== localLang) {
            this.lang = localLang;
            this._languageService.setSelectedLanguage(localLang);
        }
    }
}
