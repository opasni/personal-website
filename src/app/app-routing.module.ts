import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackboneComponent } from './components/backbone/backbone.component';

const routes: Routes = [{
    path: '',
    component: BackboneComponent,
    children: [
        {
            path: '',
            redirectTo: 'overview',
            pathMatch: 'full'
        }, {
            path: 'overview',
            loadChildren: () => import('./modules/overview/overview.module').then((m) => m.OverviewModule),
        }
    ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
