import { ElementRef, Injectable, QueryList, inject } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { LanguageService } from './language.service';

@Injectable({
	providedIn: 'root'
})
export class PrintService {
	public sheetElements!: QueryList<ElementRef<HTMLBodyElement>>;
  private languageService = inject(LanguageService);

  public set fileName(value: string) {
    this._fileName = value
  }

  private _fileName!: string;

	public async printPdf() {
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

    pdf.save(`${this._fileName}_CrtHarej_${this.languageService.selectedLanguage$.getValue().toUpperCase()}.pdf`);
	}
}