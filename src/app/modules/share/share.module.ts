import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultPhotoDirective } from './directives/default-photo/default-photo.directive';
import { TranslateModule } from '@ngx-translate/core';
import { HoverImageDirective } from './directives/hoverImage/hover-image.directive';



@NgModule({
    declarations: [
        DefaultPhotoDirective,
        HoverImageDirective
    ],
    imports: [
        CommonModule,
        TranslateModule
    ],
    exports: [
        DefaultPhotoDirective,
        HoverImageDirective
    ]
})
export class ShareModule { }
