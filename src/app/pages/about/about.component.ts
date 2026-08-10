import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

import { ThemeComponent } from '@lib/abstracts/theme.component';
import { ScrollDetectDirective } from '@lib/directives/scroll-detect/scroll-detect.directive';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [CommonModule, TranslatePipe, ScrollDetectDirective],
})
export class AboutComponent extends ThemeComponent {}
