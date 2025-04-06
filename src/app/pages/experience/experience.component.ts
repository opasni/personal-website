import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { ScrollDetectDirective } from '@lib/directives/scroll-detect/scroll-detect.directive';
import { ThemeComponent } from '@lib/abstracts/theme.component';

@Component({
    selector: 'app-experience',
    templateUrl: './experience.component.html',
    styleUrls: ['./experience.component.scss'],
    imports: [
        CommonModule,
        TranslateModule,
        ScrollDetectDirective
    ]
})
export class ExperienceComponent extends ThemeComponent {

}
