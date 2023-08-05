import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CvRoutingModule } from './cv-routing.module';
import { OverviewComponent } from './components/overview/overview.component';
import { TranslateModule } from '@ngx-translate/core';
import { SkillsModule } from '../skills/skills.module';


@NgModule({
  declarations: [
    OverviewComponent
  ],
  imports: [
    CommonModule,
    CvRoutingModule,
    SkillsModule,
    TranslateModule,
  ]
})
export class CvModule { }
