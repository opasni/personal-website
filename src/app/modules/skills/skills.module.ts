import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from '../share/share.module';
import { SkillsComponent } from './components/skills/skills.component';
import { TranslateModule } from '@ngx-translate/core';
import { SkillsRoutingModule } from './skills-routing.module';
import { SkillMeasureComponent } from './components/skill-measure/skill-measure.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SkillsComponent,
    SkillMeasureComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    FormsModule,
    TranslateModule,
    SkillsRoutingModule
  ]
})
export class SkillsModule { }
