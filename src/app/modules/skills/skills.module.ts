import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from '../share/share.module';
import { SkillsComponent } from './components/skills/skills.component';
import { TranslateModule } from '@ngx-translate/core';
import { SkillsRoutingModule } from './skills-routing.module';
import { SkillMeasureComponent } from './components/skill-measure/skill-measure.component';
import { FormsModule } from '@angular/forms';
import { HardSkillsComponent } from './components/hard-skills/hard-skills.component';
import { SoftSkillsComponent } from './components/soft-skills/soft-skills.component';
import { HobbiesComponent } from './components/hobbies/hobbies.component';
import { LanguagesComponent } from './components/languages/languages.component';



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
    ShareModule,
    FormsModule,
    TranslateModule,
    SkillsRoutingModule
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
