import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './components/contact/contact.component';
import { ShareModule } from '../share/share.module';
import { ContactRoutingModule } from './contact-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterErrorPipe } from './pipes/filter-error/filter-error.pipe';
import { RecaptchaModule } from 'ng-recaptcha';
import { SuccessComponent } from './components/success/success.component';



@NgModule({
    declarations: [
        ContactComponent,
        FilterErrorPipe,
        SuccessComponent
    ],
    imports: [
        CommonModule,
        ShareModule,
        TranslateModule,
        ReactiveFormsModule,
        RecaptchaModule,
        ContactRoutingModule
    ]
})
export class ContactModule { }
