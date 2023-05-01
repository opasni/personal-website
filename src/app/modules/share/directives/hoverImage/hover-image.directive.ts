import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHoverImage]'
})
export class HoverImageDirective {

    @Input() appHoverImage: string | undefined;

    @HostListener('mouseover') onIn() {
        if (this.appHoverImage) {
            this.toggleCoverImage(true);
        }
    }
    @HostListener('mouseout') onOut() {
        if (this.appHoverImage) {
            this.toggleCoverImage(false);
        }
    }

    private readonly element: HTMLImageElement;
    private readonly staticSrc: string = '';

    constructor(el: ElementRef) {
        this.element = el.nativeElement;
        if (this.element) {
            this.staticSrc = this.element.src;
        }
    }

    private toggleCoverImage(on: boolean) {
        this.element.src = on ? this.appHoverImage ?? this.staticSrc : this.staticSrc;
    }

}
