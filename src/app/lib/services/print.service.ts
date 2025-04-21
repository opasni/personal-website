import { ElementRef, Injectable, QueryList, inject } from '@angular/core';
import { LanguageService } from './language.service';

@Injectable()
export class PrintService {
    public sheetElements!: QueryList<ElementRef<HTMLBodyElement>>;
    private languageService = inject(LanguageService);

    public set fileName(value: string) {
        this._fileName = value;
    }

    private _fileName!: string;

    public async printPdf(): Promise<void> {
        const html2canvas = await import('html2canvas');
        const jsPDF = await import('jspdf').then((value) => value.default);
        const pdf = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'a4',
            compress: false,
        });

        if (!this.sheetElements.first) {
            return;
        }

        let pageCount = 0;
        for (const sheet of this.sheetElements) {
            pageCount++;
            await html2canvas
                .default(sheet.nativeElement, {
                    scale: 6,
                })
                .then((canvas) => {
                    const FILE_URI = canvas.toDataURL('image/png', 1.0);
                    pdf.addImage(FILE_URI, 'PNG', 0, 0, 210, 298, `cv_${pageCount}`, 'FAST');
                });
        }

        pdf.save(`${this._fileName}_CrtHarej_${this.languageService.selectedLanguage$.getValue().toUpperCase()}.pdf`);
    }
}
