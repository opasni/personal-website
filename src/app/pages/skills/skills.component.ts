import { Component, OnInit, inject } from '@angular/core';
import { ThemeComponent } from '@lib/abstracts/theme.component';
import { SkillsService } from '@lib/services/skills.service';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { SkillsModule } from 'src/app/modules/skills/skills.module';
import { ScrollDetectDirective } from '@lib/directives/scroll-detect/scroll-detect.directive';

@Component({
    selector: 'app-skills',
    templateUrl: './skills.component.html',
    styleUrls: ['./skills.component.scss'],
    imports: [CommonModule, SkillsModule, TranslateModule, ScrollDetectDirective],
    providers: [SkillsService],
})
export class SkillsComponent extends ThemeComponent implements OnInit {
    private skills = inject(SkillsService);

    ngOnInit(): void {
        this.skills.minified = false;
    }
}
