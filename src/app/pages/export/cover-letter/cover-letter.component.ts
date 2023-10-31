import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportComponent } from '@lib/abstracts/export.component';
import { User } from '@lib/classes/user.class';

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

  recipient = new User({
    title: 'Mr.',
    firstName: '',
    lastName: '',
    nickName: '',
    street: '',
    city: '',
  });

  text: string[] = [
  ];

  regards = '';
}
