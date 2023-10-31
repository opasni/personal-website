import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { SkillsService } from '@lib/services/skills.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SkillsModule } from 'src/app/modules/skills/skills.module';

@Component({
  standalone: true,
  selector: 'app-skills-overview',
  templateUrl: './skills-overview.component.html',
  styleUrls: ['./skills-overview.component.scss'],
  providers: [SkillsService],
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    SkillsModule,
    TranslateModule,
  ]
})
export class SkillsOverviewComponent implements OnInit {

  private skills = inject(SkillsService);

  ngOnInit(): void {
    this.skills.minified = true;
  }

}
