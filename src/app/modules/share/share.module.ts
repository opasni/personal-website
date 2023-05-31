import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultPhotoDirective } from './directives/default-photo/default-photo.directive';
import { TranslateModule } from '@ngx-translate/core';
import { HoverImageDirective } from './directives/hover-image/hover-image.directive';
import { ScrollDetectDirective } from './directives/scroll-detect/scroll-detect.directive';



@NgModule({
    declarations: [
        DefaultPhotoDirective,
        HoverImageDirective,
        ScrollDetectDirective
    ],
    imports: [
        CommonModule,
        TranslateModule
    ],
    exports: [
        DefaultPhotoDirective,
        HoverImageDirective,
        ScrollDetectDirective
    ]
})
export class ShareModule { }
