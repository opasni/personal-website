import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHoverImage]'
})
export class HoverImageDirective {

    @Input() appHoverImage: string | undefined;

    @HostListener('mouseover') onHover() {
        this.onImageHover();
    }

    constructor(
        private el: ElementRef
    ) { }

    private onImageHover() {
        if (this.appHoverImage) {
            let part = this.el.nativeElement as HTMLImageElement;
            part.src = this.appHoverImage;
        }
    }

}
