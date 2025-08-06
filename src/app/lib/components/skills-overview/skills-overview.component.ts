import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { SkillsService } from '@lib/services/skills.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SkillMeasureComponent } from 'src/app/modules/skills/components/skill-measure/skill-measure.component';

@Component({
    selector: 'app-skills-overview',
    templateUrl: './skills-overview.component.html',
    styleUrls: ['./skills-overview.component.scss'],
    providers: [SkillsService],
    encapsulation: ViewEncapsulation.None,
    imports: [CommonModule, SkillMeasureComponent, TranslateModule],
})
export class SkillsOverviewComponent implements OnInit {
    private _skills = inject(SkillsService);

    ngOnInit(): void {
        this._skills.minified = true;
    }
}
