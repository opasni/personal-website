import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

// Components
import { ExperienceComponent } from '@pages/experience/experience.component';
import { SkillsOverviewComponent } from '@lib/components/skills-overview/skills-overview.component';
// Services
import { ExportComponent } from '@lib/abstracts/export.component';

@Component({
  selector: 'app-cv',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss'],
  imports: [
    CommonModule,
    ExperienceComponent,
    SkillsOverviewComponent,
    TranslateModule,
  ]
})
export class CVComponent extends ExportComponent implements OnInit {
  override ngOnInit(): void {
    super.ngOnInit();
    this.printService.fileName = 'CV';
  }
}
