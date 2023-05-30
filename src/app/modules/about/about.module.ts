import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { ShareModule } from '../share/share.module';
import { AboutRoutingModule } from './about-routing.module';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
    declarations: [
        AboutComponent
    ],
    imports: [
        CommonModule,
        ShareModule,
        TranslateModule,
        AboutRoutingModule
    ]
})
export class AboutModule { }
