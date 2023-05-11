import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducationComponent } from './education/education.component';
import { ShareModule } from '../share/share.module';
import { EducationRoutingModule } from './education-routing.module';



@NgModule({
    declarations: [
        EducationComponent
    ],
    imports: [
        CommonModule,
        ShareModule,
        EducationRoutingModule
    ]
})
export class EducationModule { }
