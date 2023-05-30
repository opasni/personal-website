import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from '../share/share.module';
import { AboutRoutingModule } from '../about/about-routing.module';
import { SkillsComponent } from './skills/skills.component';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
    declarations: [
    SkillsComponent
  ],
    imports: [
        CommonModule,
        ShareModule,
        TranslateModule,
        AboutRoutingModule
    ]
})
export class SkillsModule { }
