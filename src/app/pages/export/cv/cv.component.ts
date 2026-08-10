import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

// Components
import { SkillsOverviewComponent } from '@lib/components/skills-overview/skills-overview.component';
// Services
import { ExportComponent } from '@lib/abstracts/export.component';

@Component({
    selector: 'app-cv',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './cv.component.html',
    styleUrls: ['./cv.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [CommonModule, SkillsOverviewComponent, TranslatePipe],
})
export class CVComponent extends ExportComponent implements OnInit {
    async ngOnInit(): Promise<void> {
        await this.setUser();
        this.printService.fileName = 'CV';
    }
}
