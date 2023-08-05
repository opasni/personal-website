import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { SkillsRoutingModule } from './skills-routing.module';
import { SkillsComponent } from './components/skills/skills.component';
import { SkillMeasureComponent } from './components/skill-measure/skill-measure.component';
import { HardSkillsComponent } from './components/hard-skills/hard-skills.component';
import { SoftSkillsComponent } from './components/soft-skills/soft-skills.component';
import { HobbiesComponent } from './components/hobbies/hobbies.component';
import { LanguagesComponent } from './components/languages/languages.component';
import { ScrollDetectDirective } from 'src/app/directives/scroll-detect/scroll-detect.directive';



@NgModule({
  declarations: [
    SkillsComponent,
    SkillMeasureComponent,
    HardSkillsComponent,
    SoftSkillsComponent,
    HobbiesComponent,
    LanguagesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    SkillsRoutingModule,
    ScrollDetectDirective
  ],
  exports: [
    SkillsComponent,
    HardSkillsComponent,
    SoftSkillsComponent,
    HobbiesComponent,
    LanguagesComponent
  ]
})
export class SkillsModule { }
