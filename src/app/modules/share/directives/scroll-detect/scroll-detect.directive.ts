import { AfterViewInit, Directive, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
    selector: '[appScrollDetect]'
})
export class ScrollDetectDirective implements AfterViewInit {

    private _orderedRoutes = [
        '/about',
        '/skills',
        '/experience',
        '/education',
        '/contact'
    ];
    private _isTop = true;
    private _isBottom = false;
    private _defaultTouch = { x: 0, y: 0, position: 'none' };

    constructor(
        private host: ElementRef,
        private router: Router
    ) { }

    ngAfterViewInit(): void {
        this.checkPositions();
    }

    @HostListener('touchstart', ['$event'])
    @HostListener('touchend', ['$event'])
    handleTouch(event: TouchEvent) {
        if (!this.host.nativeElement) {
            return;
        }
        console.log(event);
        const touch = event.touches[0] || event.changedTouches[0];
        if (event.type === 'touchstart') {
            this._defaultTouch.y = touch.screenY;
            this._defaultTouch.position = this.getPositions();
        } else if (event.type === 'touchend') {
            const deltaY = touch.screenY - this._defaultTouch.y;
            if (this._defaultTouch.position === this.getPositions()) {
                if (this._defaultTouch.position === 'both') {
                    this._isTop = true;
                    this._isBottom = true;
                } else if (this._defaultTouch.position === 'top') {
                    this._isTop = true;
                } else if (this._defaultTouch.position === 'bottom') {
                    this._isBottom = true;
                } else {
                    return;
                }
                this.checkAndNavigate(-deltaY * 10);
            }
        }
    }

    @HostListener('wheel', ['$event']) onMousewheel(event: WheelEvent) {
        if (!this.host.nativeElement) {
            return;
        }
        this.checkAndNavigate(event.deltaY);
        this.checkPositions();
    }

    private checkPositions() {
        const element = this.host.nativeElement as HTMLDivElement;
        const scroller = element.parentElement?.parentElement;
        if (!scroller) {
            return;
        }
        if (scroller.scrollTop !== 0) {
            this._isTop = false;
        } else if (this._isTop === false && scroller.scrollTop === 0) {
            setTimeout(() => this._isTop = true, 600);
        }
        console.log(scroller.scrollHeight, window.innerHeight, scroller.scrollTop, window.innerHeight + scroller.scrollTop);
        if (scroller.scrollHeight !== (window.innerHeight + scroller.scrollTop)) {
            this._isBottom = false;
        } else if (this._isBottom === false && scroller.scrollHeight === (window.innerHeight + scroller.scrollTop)) {
            setTimeout(() => this._isBottom = true, 600);
        }
    }

    private getPositions(): 'none' | 'top' | 'bottom' | 'both' {
        const element = this.host.nativeElement as HTMLDivElement;
        const scroller = element.parentElement?.parentElement;
        const isTop = scroller && Math.abs(scroller.scrollTop) < 1;
        const isBottom = scroller && Math.abs(scroller.scrollHeight - (window.innerHeight + scroller.scrollTop)) < 1;
        if (isTop && isBottom) {
            return 'both';
        } else if (isTop) {
            return 'top'
        } else if (isBottom) {
            return 'bottom';
        }
        return 'none';
    }

    private checkAndNavigate(deltaY: number) {
        if (this._isTop && deltaY < -20) {
            const index = this._orderedRoutes.indexOf(this.router.url);
            if (index > 0) {
                this.router.navigate([this._orderedRoutes[index - 1]]);
            }
        } else if (this._isBottom && deltaY > 20) {
            const index = this._orderedRoutes.indexOf(this.router.url);
            if (index < 4) {
                this.router.navigate([this._orderedRoutes[index + 1]]);
            }
        }
    }
}
