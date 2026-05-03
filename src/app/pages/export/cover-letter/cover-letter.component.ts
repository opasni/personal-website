import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportComponent } from '@lib/abstracts/export.component';
// import data from '@lib/data/cover-letter.template.json';
// import data from '@lib/data/cover-letters/simens/20250508-cover-letter.en.json';
// import data from '@lib/data/cover-letters/kpmg/20250509-cover-letter.en.json';
import data from '@lib/data/cover-letters/google/20250815-cover-letter.en.json';
import { CoverLetter } from '@lib/types/cover-leter.type';

@Component({
    selector: 'app-cover-letter',
    encapsulation: ViewEncapsulation.None,
    imports: [CommonModule],
    templateUrl: './cover-letter.component.html',
    styleUrls: ['./cover-letter.component.scss'],
})
export class CoverLetterComponent extends ExportComponent implements OnInit {
    date = new Date();
    coverLetter: CoverLetter = data ?? { recipient: {}, content: [] };
    async ngOnInit(): Promise<void> {
        await this.setUser();
        this.printService.fileName = 'CoverLetter';
    }
}
