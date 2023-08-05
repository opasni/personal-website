import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { ThemeComponent } from '../../abstracts/theme.component';
import { ScrollDetectDirective } from 'src/app/directives/scroll-detect/scroll-detect.directive';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    ScrollDetectDirective
  ]
})
export class AboutComponent extends ThemeComponent {

}
