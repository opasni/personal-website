import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'cv',
        title: 'Črt Harej - CV',
        loadComponent: async () => (await import('@pages/export/cv/cv.component')).CVComponent,
    },
    {
        path: 'cover-letter',
        title: 'Črt Harej - Cover Letter',
        loadComponent: async () =>
            (await import('@pages/export/cover-letter/cover-letter.component')).CoverLetterComponent,
    },
];
