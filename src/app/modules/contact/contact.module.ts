import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';
import { TranslateModule } from '@ngx-translate/core';

import { ContactComponent } from './components/contact/contact.component';
import { ContactRoutingModule } from './contact-routing.module';
import { FilterErrorPipe } from './pipes/filter-error/filter-error.pipe';
import { SuccessComponent } from './components/success/success.component';
import { ScrollDetectDirective } from 'src/app/directives/scroll-detect/scroll-detect.directive';



@NgModule({
    declarations: [
        ContactComponent,
        FilterErrorPipe,
        SuccessComponent
    ],
    imports: [
        CommonModule,
        TranslateModule,
        ReactiveFormsModule,
        RecaptchaModule,
        ContactRoutingModule,
        ScrollDetectDirective
    ]
})
export class ContactModule { }
