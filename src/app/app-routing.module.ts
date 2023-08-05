import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackboneComponent } from './components/backbone/backbone.component';
import { AboutComponent } from './components/about/about.component';

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
				path: 'timeline',
				loadChildren: () => import('./modules/timeline/timeline.module').then((m) => m.TimelineModule),
			}, {
				path: 'contact',
				loadChildren: () => import('./modules/contact/contact.module').then((m) => m.ContactModule),
			}
		]
	}, {
		path: 'cv',
		loadChildren: () => import('./modules/cv/cv.module').then((m) => m.CvModule),
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
