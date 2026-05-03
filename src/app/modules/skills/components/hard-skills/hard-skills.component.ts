import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { SectionComponent } from '@lib/abstracts/section.component';

@Component({
    selector: 'app-hard-skills',
    templateUrl: './hard-skills.component.html',
    styleUrls: ['./hard-skills.component.scss'],
    imports: [TranslatePipe],
})
export class HardSkillsComponent extends SectionComponent {}
