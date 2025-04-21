import { Component, OnInit, inject } from '@angular/core';
import { ThemeComponent } from '@lib/abstracts/theme.component';
import { SkillsService } from '@lib/services/skills.service';
import { TranslateModule } from '@ngx-translate/core';
import { ScrollDetectDirective } from '@lib/directives/scroll-detect/scroll-detect.directive';
import { AsyncPipe, NgClass } from '@angular/common';
import { HardSkillsComponent } from 'src/app/modules/skills/components/hard-skills/hard-skills.component';
import { SoftSkillsComponent } from 'src/app/modules/skills/components/soft-skills/soft-skills.component';
import { LanguagesComponent } from 'src/app/modules/skills/components/languages/languages.component';
import { HobbiesComponent } from 'src/app/modules/skills/components/hobbies/hobbies.component';

@Component({
    selector: 'app-skills',
    templateUrl: './skills.component.html',
    styleUrls: ['./skills.component.scss'],
    imports: [
        AsyncPipe,
        NgClass,
        HardSkillsComponent,
        SoftSkillsComponent,
        LanguagesComponent,
        HobbiesComponent,
        TranslateModule,
        ScrollDetectDirective,
    ],
    providers: [SkillsService],
})
export class SkillsComponent extends ThemeComponent implements OnInit {
    private _skills = inject(SkillsService);

    ngOnInit(): void {
        this._skills.minified = false;
    }
}
