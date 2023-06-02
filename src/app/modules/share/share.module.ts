import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ScrollDetectDirective } from './directives/scroll-detect/scroll-detect.directive';



@NgModule({
    declarations: [
        ScrollDetectDirective
    ],
    imports: [
        CommonModule,
        TranslateModule
    ],
    exports: [
        ScrollDetectDirective
    ]
})
export class ShareModule { }
