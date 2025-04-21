import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { SkillsService } from '@lib/services/skills.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { HardSkillsComponent } from 'src/app/modules/skills/components/hard-skills/hard-skills.component';
import { SoftSkillsComponent } from 'src/app/modules/skills/components/soft-skills/soft-skills.component';
import { LanguagesComponent } from 'src/app/modules/skills/components/languages/languages.component';

@Component({
    selector: 'app-skills-overview',
    templateUrl: './skills-overview.component.html',
    styleUrls: ['./skills-overview.component.scss'],
    providers: [SkillsService],
    encapsulation: ViewEncapsulation.None,
    imports: [CommonModule, HardSkillsComponent, SoftSkillsComponent, LanguagesComponent, TranslateModule],
})
export class SkillsOverviewComponent implements OnInit {
    private _skills = inject(SkillsService);

    ngOnInit(): void {
        this._skills.minified = true;
    }
}
