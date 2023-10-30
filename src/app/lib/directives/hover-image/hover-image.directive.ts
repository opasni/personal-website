import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
	standalone: true,
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
		if (on) {
			this.element.src = this.appHoverImage ?? this.staticSrc;
			document.getElementById('profile')?.classList.add('activated');
		} else {
			this.element.src = this.staticSrc;
			document.getElementById('profile')?.classList.remove('activated');
		}
	}

}
