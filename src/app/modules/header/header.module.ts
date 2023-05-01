import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderRoutingModule } from './header-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { ShareModule } from '../share/share.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        HeaderComponent,
    ],
    imports: [
        CommonModule,
        HeaderRoutingModule,
        TranslateModule,
        ShareModule,
    ],
    exports: [
        HeaderComponent
    ]
})
export class HeaderModule { }
