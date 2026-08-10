import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { ThemeComponent } from '@lib/abstracts/theme.component';
import { SkillsService } from '@lib/services/skills.service';
import { TranslatePipe } from '@ngx-translate/core';
import { ScrollDetectDirective } from '@lib/directives/scroll-detect/scroll-detect.directive';
import { SoftSkillsComponent } from '@modules/skills/components/soft-skills/soft-skills.component';
import { HardSkillsComponent } from '@modules/skills/components/hard-skills/hard-skills.component';
import { LanguagesComponent } from '@modules/skills/components/languages/languages.component';
import { HobbiesComponent } from '@modules/skills/components/hobbies/hobbies.component';

@Component({
    selector: 'app-skills',
    templateUrl: './skills.component.html',
    styleUrls: ['./skills.component.scss'],
    imports: [
        HardSkillsComponent,
        SoftSkillsComponent,
        LanguagesComponent,
        HobbiesComponent,
        TranslatePipe,
        ScrollDetectDirective,
    ],
    changeDetection: ChangeDetectionStrategy.Eager,
    providers: [SkillsService],
})
export class SkillsComponent extends ThemeComponent implements OnInit {
    private _skills = inject(SkillsService);

    ngOnInit(): void {
        this._skills.minified = false;
    }
}
