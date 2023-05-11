import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackboneComponent } from './components/backbone/backbone.component';

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
            path: 'experience',
            loadChildren: () => import('./modules/experience/experience.module').then((m) => m.ExperienceModule),
        }, {
            path: 'skills',
            loadChildren: () => import('./modules/skills/skills.module').then((m) => m.SkillsModule),
        }, {
            path: 'education',
            loadChildren: () => import('./modules/education/education.module').then((m) => m.EducationModule),
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
