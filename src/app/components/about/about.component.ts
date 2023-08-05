import { Component } from '@angular/core';
import { ThemeComponent } from '../../modules/share/abstracts/theme.component';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule
  ]
})
export class AboutComponent extends ThemeComponent {

}
