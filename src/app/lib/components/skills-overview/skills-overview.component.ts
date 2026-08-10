import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'app-skills-overview',
    templateUrl: './skills-overview.component.html',
    styleUrls: ['./skills-overview.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [TranslatePipe],
})
export class SkillsOverviewComponent {}
