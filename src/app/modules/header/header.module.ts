import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderRoutingModule } from './header-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { ShareModule } from '../share/share.module';
import { TranslateModule } from '@ngx-translate/core';
import { ProfileComponent } from './components/profile/profile.component';
import { HoverImageDirective } from './directives/hover-image/hover-image.directive';

@NgModule({
    declarations: [
        HeaderComponent,
        ProfileComponent,
        HoverImageDirective,
    ],
    imports: [
        CommonModule,
        HeaderRoutingModule,
        TranslateModule,
        ShareModule,
    ],
    exports: [
        HeaderComponent,
        ProfileComponent
    ]
})
export class HeaderModule { }
