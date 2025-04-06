import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ThemeComponent } from '@lib/abstracts/theme.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-success',
    templateUrl: './success.component.html',
    styleUrls: ['./success.component.scss'],
    imports: [
        CommonModule,
        TranslateModule
    ]
})
export class SuccessComponent extends ThemeComponent {

}
