import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { ThemeComponent } from '@lib/abstracts/theme.component';
import { ScrollDetectDirective } from '@lib/directives/scroll-detect/scroll-detect.directive';

@Component({
  standalone: true,
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  imports: [
    CommonModule,
    TranslateModule,
    ScrollDetectDirective
  ]
})
export class AboutComponent extends ThemeComponent {

}
