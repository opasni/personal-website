import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EducationComponent } from './components/education/education.component';
import { ExperienceComponent } from './components/experience/experience.component';

const routes: Routes = [
  {
    path: 'experience',
    component: ExperienceComponent,
    data: { animation: 2 },
  }, {
    path: 'education',
    component: EducationComponent,
    data: { animation: 3 }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimelineRoutingModule { }
