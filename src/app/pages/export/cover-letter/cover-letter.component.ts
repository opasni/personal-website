import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportComponent } from '@lib/abstracts/export.component';
import data from '@lib/data/cover-letter.template.json';
import { CoverLetter } from '@lib/types/cover-leter.type';

@Component({
  selector: 'app-cover-letter',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule],
  templateUrl: './cover-letter.component.html',
  styleUrls: ['./cover-letter.component.scss']
})
export class CoverLetterComponent extends ExportComponent implements OnInit {
  override ngOnInit(): void {
    super.ngOnInit();
    this.printService.fileName = 'CoverLetter';
  }
  date = new Date();
  coverLetter: CoverLetter = data ?? { recipient: {}, content: []};
}
