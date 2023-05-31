import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './components/contact/contact.component';
import { SuccessComponent } from './components/success/success.component';

const routes: Routes = [
	{
		path: '',
		component: ContactComponent,
        data: { animation: 4 },
    },
    {
        path: 'success',
        component: SuccessComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContactRoutingModule { }
