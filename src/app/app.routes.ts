import { Routes } from '@angular/router';
import { PageBackboneComponent } from '@lib/components/page-backbone/page-backbone.component';
import { ExportBackboneComponent } from '@lib/components/export-backbone/export-backbone.component';

export const routes: Routes = [
	{
		path: '',
		component: PageBackboneComponent,
		children: [
			{
				path: '',
				redirectTo: 'about',
				pathMatch: 'full'
			}, {
				path: 'about',
				title: 'Črt Harej - About Me',
        loadComponent: async () => (await import('@pages/about/about.component')).AboutComponent,
				data: { animation: 0 }
			}, {
				path: 'skills',
				title: 'Črt Harej - My Skills',
        loadComponent: async () => (await import('@pages/skills/skills.component')).SkillsComponent,
        data: { animation: 1 }
			}, {
				path: 'experience',
				title: 'Črt Harej - Experiences',
        loadComponent: async () => (await import('@pages/experience/experience.component')).ExperienceComponent,
				data: { animation: 2 }
			}, {
				path: 'education',
				title: 'Črt Harej - Education',
        loadComponent: async () => (await import('@pages/education/education.component')).EducationComponent,
				data: { animation: 3 }
			}, {
				path: 'contact',
        loadChildren: async () => (await import('@pages/contact')).routes,
			}
		]
	}, {
		path: 'export',
		component: ExportBackboneComponent,
		loadChildren: async () => (await import('@pages/export')).routes,
	}
];