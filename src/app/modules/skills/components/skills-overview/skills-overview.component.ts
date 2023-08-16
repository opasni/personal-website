import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { SkillsService } from '../../services/skills.service';

@Component({
  selector: 'app-skills-overview',
  templateUrl: './skills-overview.component.html',
  styleUrls: ['./skills-overview.component.scss'],
  providers: [SkillsService],
  encapsulation: ViewEncapsulation.None
})
export class SkillsOverviewComponent implements OnInit {

  private skills = inject(SkillsService);

  ngOnInit(): void {
    this.skills.minified = true;
  }

}
