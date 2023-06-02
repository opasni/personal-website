import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimelineRoutingModule } from './timeline-routing.module';
import { EducationComponent } from './components/education/education.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ShareModule } from '../share/share.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    ExperienceComponent,
    EducationComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    TranslateModule,
    TimelineRoutingModule
  ]
})
export class TimelineModule { }
