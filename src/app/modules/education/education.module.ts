import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducationComponent } from './education/education.component';
import { ShareModule } from '../share/share.module';
import { EducationRoutingModule } from './education-routing.module';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
    declarations: [
        EducationComponent
    ],
    imports: [
        CommonModule,
        ShareModule,
        TranslateModule,
        EducationRoutingModule
    ]
})
export class EducationModule { }
