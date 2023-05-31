import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackboneComponent } from './components/backbone/backbone.component';
import { EducationComponent } from './components/education/education.component';
import { ExperienceComponent } from './components/experience/experience.component';

const routes: Routes = [{
    path: '',
    component: BackboneComponent,
    children: [
        {
            path: '',
            redirectTo: 'about',
            pathMatch: 'full'
        }, {
            path: 'about',
            loadChildren: () => import('./modules/about/about.module').then((m) => m.AboutModule),
        }, {
            path: 'skills',
            loadChildren: () => import('./modules/skills/skills.module').then((m) => m.SkillsModule),
        }, {
            path: 'experience',
            component: ExperienceComponent,
            data: { animation: 2 },
        }, {
            path: 'education',
            component: EducationComponent,
            data: { animation: 3 }
        }, {
            path: 'contact',
            loadChildren: () => import('./modules/contact/contact.module').then((m) => m.ContactModule),
        }
    ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
