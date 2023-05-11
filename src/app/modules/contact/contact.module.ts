import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact/contact.component';
import { ShareModule } from '../share/share.module';
import { ContactRoutingModule } from './contact-routing.module';



@NgModule({
    declarations: [
        ContactComponent
    ],
    imports: [
        CommonModule,
        ShareModule,
        ContactRoutingModule
    ]
})
export class ContactModule { }
