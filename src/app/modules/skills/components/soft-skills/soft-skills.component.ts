import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SectionComponent } from '@lib/abstracts/section.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'app-soft-skills',
    templateUrl: './soft-skills.component.html',
    styleUrls: ['./soft-skills.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [TranslatePipe],
})
export class SoftSkillsComponent extends SectionComponent {}
