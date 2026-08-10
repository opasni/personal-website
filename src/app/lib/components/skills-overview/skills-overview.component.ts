import { Component, ViewEncapsulation } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-skills-overview',
    templateUrl: './skills-overview.component.html',
    styleUrls: ['./skills-overview.component.scss'],
    encapsulation: ViewEncapsulation.None,
    imports: [TranslateModule],
})
export class SkillsOverviewComponent {}
