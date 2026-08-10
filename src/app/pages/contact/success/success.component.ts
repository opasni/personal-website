import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ThemeComponent } from '@lib/abstracts/theme.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'app-success',
    templateUrl: './success.component.html',
    styleUrls: ['./success.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [CommonModule, TranslatePipe],
})
export class SuccessComponent extends ThemeComponent {}
