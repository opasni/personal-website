import { Component, OnInit, inject } from '@angular/core';
import { ThemeComponent } from 'src/app/abstracts/theme.component';
import { SkillsService } from '../../services/skills.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
  providers: [SkillsService]
})
export class SkillsComponent extends ThemeComponent implements OnInit {

  private skills = inject(SkillsService);

  override ngOnInit(): void {
    this.skills.minified = false;
    super.ngOnInit();
  }

}