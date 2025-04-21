import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { SectionComponent } from '@lib/abstracts/section.component';
import { SkillMeasureComponent } from '../skill-measure/skill-measure.component';

@Component({
    selector: 'app-hard-skills',
    templateUrl: './hard-skills.component.html',
    styleUrls: ['./hard-skills.component.scss'],
    imports: [TranslatePipe, SkillMeasureComponent],
})
export class HardSkillsComponent extends SectionComponent {}
