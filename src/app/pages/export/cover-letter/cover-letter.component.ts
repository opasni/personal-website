import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cover-letter',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule],
  templateUrl: './cover-letter.component.html',
  styleUrls: ['./cover-letter.component.scss']
})
export class CoverLetterComponent {

}
