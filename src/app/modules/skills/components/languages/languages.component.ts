import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { SectionComponent } from '@lib/abstracts/section.component';
import { SkillMeasureComponent } from '../skill-measure/skill-measure.component';

@Component({
    selector: 'app-languages',
    templateUrl: './languages.component.html',
    styleUrls: ['./languages.component.scss'],
    imports: [TranslatePipe, SkillMeasureComponent],
})
export class LanguagesComponent extends SectionComponent {}
