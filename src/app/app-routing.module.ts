import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BackboneComponent } from './components/backbone/backbone.component';
import { AboutComponent } from './components/about/about.component';
import { CVComponent } from './components/cv/cv.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { EducationComponent } from './components/education/education.component';

const routes: Routes = [
	{
		path: '',
		component: BackboneComponent,
		children: [
			{
				path: '',
				redirectTo: 'about',
				pathMatch: 'full'
			}, {
				path: 'about',
				component: AboutComponent,
				data: { animation: 0 }
			}, {
				path: 'skills',
				loadChildren: () => import('./modules/skills/skills.module').then((m) => m.SkillsModule),
			}, {
				path: 'experience',
				component: ExperienceComponent,
				data: { animation: 2 }
			}, {
				path: 'education',
				component: EducationComponent,
				data: { animation: 3 }
			}, {
				path: 'contact',
				loadChildren: () => import('./modules/contact/contact.module').then((m) => m.ContactModule),
			}
		]
	}, {
		path: 'cv',
		component: CVComponent,
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
