import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceComponent } from './experience/experience.component';
import { ShareModule } from '../share/share.module';
import { ExperienceRoutingModule } from './experience-routing.module';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
    declarations: [
        ExperienceComponent
    ],
    imports: [
        CommonModule,
        ShareModule,
        TranslateModule,
        ExperienceRoutingModule
    ]
})
export class ExperienceModule { }
