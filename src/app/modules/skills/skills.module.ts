import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from '../share/share.module';
import { SkillsComponent } from './components/skills/skills.component';
import { TranslateModule } from '@ngx-translate/core';
import { SkillsRoutingModule } from './skills-routing.module';



@NgModule({
  declarations: [
    SkillsComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    TranslateModule,
    SkillsRoutingModule
  ]
})
export class SkillsModule { }
