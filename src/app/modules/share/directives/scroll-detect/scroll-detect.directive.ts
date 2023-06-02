import { AfterViewInit, Directive, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Position } from '../../classes/position.class';

@Directive({
    selector: '[appScrollDetect]'
})
export class ScrollDetectDirective implements AfterViewInit {

    private _orderedRoutes = [
        '/about',
        '/skills',
        '/timeline/experience',
        '/timeline/education',
        '/contact'
    ];

    private _position = new Position();
    private _defaultTouch = { x: 0, y: 0 };

    constructor(
        private host: ElementRef,
        private router: Router
    ) { }

    ngAfterViewInit(): void {
        this._position = this.getPositions();
    }

    @HostListener('touchstart', ['$event'])
    @HostListener('touchend', ['$event'])
    handleTouch(event: TouchEvent) {
        if (!this.host.nativeElement) {
            return;
        }
        const touch = event.touches[0] || event.changedTouches[0];
        if (event.type === 'touchstart') {
            this._defaultTouch.y = touch.screenY;
            this._position = this.getPositions();
        } else if (event.type === 'touchend') {
            const deltaY = touch.screenY - this._defaultTouch.y;
            this._position.add(this.getPositions());
            if (this._position.top > 1 || this._position.bottom > 1) {
                this.checkAndNavigate(-deltaY * 10);
            }
        }
    }

    @HostListener('wheel', ['$event']) onMousewheel(event: WheelEvent) {
        if (!this.host.nativeElement) {
            return;
        }
        this._position.add(this.getPositions());
        if (this._position.top > 36 || this._position.bottom > 18) {
            this.checkAndNavigate(event.deltaY);
        }
    }

    private getPositions(): Position {
        const element = this.host.nativeElement as HTMLDivElement;
        const scroller = element.parentElement?.parentElement;
        const isTop = scroller != null && Math.abs(scroller.scrollTop) < 1;
        const isBottom = scroller != null && Math.abs(scroller.scrollHeight - (window.innerHeight + scroller.scrollTop)) < 1;
        return new Position(isTop, isBottom);
    }

    private checkAndNavigate(deltaY: number) {
        if (this._position.top > 0 && deltaY < -20) {
            const index = this._orderedRoutes.indexOf(this.router.url);
            if (index > 0) {
                this._position = new Position();
                this.router.navigate([this._orderedRoutes[index - 1]]);
            }
        } else if (this._position.bottom > 0 && deltaY > 20) {
            const index = this._orderedRoutes.indexOf(this.router.url);
            if (index < 4) {
                this._position = new Position();
                this.router.navigate([this._orderedRoutes[index + 1]]);
            }
        }
    }
}
