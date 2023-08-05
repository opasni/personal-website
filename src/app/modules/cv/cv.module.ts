import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CvRoutingModule } from './cv-routing.module';
import { OverviewComponent } from './components/overview/overview.component';
import { ShareModule } from '../share/share.module';
import { TranslateModule } from '@ngx-translate/core';
import { SkillsModule } from '../skills/skills.module';


@NgModule({
  declarations: [
    OverviewComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    CvRoutingModule,
    SkillsModule,
    TranslateModule,
  ]
})
export class CvModule { }
