import { Component, Input } from '@angular/core';
import { ThemeComponent } from 'src/app/abstracts/theme.component';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent extends ThemeComponent {
  @Input() minified = false;

}
