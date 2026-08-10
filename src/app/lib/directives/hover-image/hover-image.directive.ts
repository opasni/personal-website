import { Directive, ElementRef, HostListener, Input, inject } from '@angular/core';

@Directive({
    standalone: true,
    selector: '[appHoverImage]',
})
export class HoverImageDirective {
    @Input() appHoverImage: string | undefined;

    private readonly _element = inject<ElementRef<HTMLImageElement>>(ElementRef).nativeElement;
    private readonly _staticSrc = this._element.src;

    @HostListener('mouseover') onIn(): void {
        if (this.appHoverImage) {
            this._toggleCoverImage(true);
        }
    }
    @HostListener('mouseout') onOut(): void {
        if (this.appHoverImage) {
            this._toggleCoverImage(false);
        }
    }

    private _toggleCoverImage(on: boolean): void {
        if (on) {
            this._element.src = this.appHoverImage ?? this._staticSrc;
            document.getElementById('profile')?.classList.add('activated');
        } else {
            this._element.src = this._staticSrc;
            document.getElementById('profile')?.classList.remove('activated');
        }
    }
}
