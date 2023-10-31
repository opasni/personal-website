import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        title: 'Črt Harej - Contact',
        loadComponent: async () => (await import('./contact/contact.component')).ContactComponent,
        data: { animation: 4 },
    },
    {
        path: 'success',
        title: 'Črt Harej - Contact Successful',
        loadComponent: async () => (await import('./success/success.component')).SuccessComponent,
    },
];
