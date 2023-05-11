import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from '../share/share.module';
import { AboutRoutingModule } from '../about/about-routing.module';
import { SkillsComponent } from './skills/skills.component';



@NgModule({
    declarations: [
    SkillsComponent
  ],
    imports: [
        CommonModule,
        ShareModule,
        AboutRoutingModule
    ]
})
export class SkillsModule { }
