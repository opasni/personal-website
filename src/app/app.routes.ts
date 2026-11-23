import { Routes } from '@angular/router';
import { PageBackboneComponent } from '@lib/components/page-backbone/page-backbone.component';
import { ExportBackboneComponent } from '@lib/components/export-backbone/export-backbone.component';

export const routes: Routes = [
    {
        path: '',
        component: PageBackboneComponent,
        children: [
            {
                path: 'imprint',
                title: 'Črt Harej — Imprint',
                loadComponent: async () => (await import('@pages/legal/legal.component')).LegalComponent,
            },
            {
                path: 'privacy',
                title: 'Črt Harej — Privacy / Datenschutz / Zasebnost',
                data: { privacy: true },
                loadComponent: async () => (await import('@pages/legal/legal.component')).LegalComponent,
            },
            { path: 'datenschutz', redirectTo: 'privacy', pathMatch: 'full' },
            {
                path: '',
                title: 'Črt Harej — Engineering, Architecture & Leadership',
                loadComponent: async () => (await import('@pages/home/home.component')).HomeComponent,
            },
            {
                path: 'about',
                redirectTo: '/#about',
                pathMatch: 'full',
            },
            {
                path: 'skills',
                title: 'Črt Harej - My Skills',
                loadComponent: async () => (await import('@pages/skills/skills.component')).SkillsComponent,
                data: { animation: 1 },
            },
            {
                path: 'experience',
                title: 'Črt Harej - Experiences',
                loadComponent: async () => (await import('@pages/experience/experience.component')).ExperienceComponent,
                data: { animation: 2 },
            },
            {
                path: 'education',
                title: 'Črt Harej - Education',
                loadComponent: async () => (await import('@pages/education/education.component')).EducationComponent,
                data: { animation: 3 },
            },
            {
                path: 'linkedin',
                title: 'Črt Harej - LinkedIn Posts',
                loadComponent: async () => (await import('@pages/linkedin/linkedin.component')).LinkedinComponent,
                data: { animation: 4 },
            },
            {
                path: 'contact',
                loadChildren: async () => (await import('@pages/contact')).routes,
            },
        ],
    },
    {
        path: 'export',
        component: ExportBackboneComponent,
        loadChildren: async () => (await import('@pages/export')).routes,
    },
];
