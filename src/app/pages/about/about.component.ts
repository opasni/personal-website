import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

import { ThemeComponent } from '@lib/abstracts/theme.component';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [CommonModule, TranslatePipe],
})
export class AboutComponent extends ThemeComponent {}
