import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { TimelineRoutingModule } from './timeline-routing.module';
import { EducationComponent } from './components/education/education.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ScrollDetectDirective } from 'src/app/directives/scroll-detect/scroll-detect.directive';


@NgModule({
  declarations: [
    ExperienceComponent,
    EducationComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    TimelineRoutingModule,
    ScrollDetectDirective
  ]
})
export class TimelineModule { }
