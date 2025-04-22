import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

// Components
import { SkillsOverviewComponent } from '@lib/components/skills-overview/skills-overview.component';
// Services
import { ExportComponent } from '@lib/abstracts/export.component';

@Component({
    selector: 'app-cv',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './cv.component.html',
    styleUrls: ['./cv.component.scss'],
    imports: [CommonModule, SkillsOverviewComponent, TranslateModule],
})
export class CVComponent extends ExportComponent implements OnInit {
    async ngOnInit(): Promise<void> {
        await this.setUser();
        this.printService.fileName = 'CV';
    }
}
