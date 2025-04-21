import { AfterViewInit, DestroyRef, Directive, ElementRef, HostListener, OnDestroy, inject } from '@angular/core';
import { Router } from '@angular/router';

import { Position } from '@lib/classes/position.class';
import { GaugeCounterService } from '@lib/services/gauge-counter.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
    selector: '[appScrollDetect]',
    standalone: true,
})
export class ScrollDetectDirective implements AfterViewInit, OnDestroy {
    private _orderedRoutes = ['/about', '/skills', '/experience', '/education', '/contact'];

    private _position = new Position();
    private _defaultTouch = { x: 0, y: 0 };

    private _host = inject(ElementRef);
    private _router = inject(Router);
    private _counterService = inject(GaugeCounterService);
    private _destroyRef = inject(DestroyRef);

    ngAfterViewInit(): void {
        this._position = this.getPositions();
        this._counterService.ready
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((deltaY) => this.checkAndNavigate(deltaY));
        this._counterService.move
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe(() => this.checkAndNavigate(this.getMaxDelta()));
    }

    ngOnDestroy(): void {
        this._counterService.clearGauge();
    }

    @HostListener('touchstart', ['$event'])
    @HostListener('touchmove', ['$event'])
    @HostListener('touchend', ['$event'])
    handleTouch(event: TouchEvent): void {
        if (!this._host.nativeElement) {
            return;
        }
        const touch = event.touches[0] || event.changedTouches[0];
        if (event.type === 'touchstart') {
            this._defaultTouch.y = touch.screenY;
            this._position = this.getPositions();
        } else if (event.type === 'touchend' || event.type === 'touchmove') {
            const deltaY = touch.screenY - this._defaultTouch.y;
            this.updatePositions(-deltaY, 12, 12);
        }
    }

    @HostListener('wheel', ['$event']) onMousewheel(event: WheelEvent): void {
        if (!this._host.nativeElement) {
            return;
        }
        const container = document.getElementById('scrollingContainer') as HTMLDivElement;
        const smallerContent =
            container.getBoundingClientRect().height - this._host.nativeElement.getBoundingClientRect().height;
        this.updatePositions(event.deltaY, 12, 12, smallerContent > 0);
    }

    @HostListener('document:keyup', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent): void {
        const navigate = event.key === 'ArrowDown' ? 1 : event.key === 'ArrowUp' ? -1 : 0;
        if (navigate !== 0) {
            const index = this._orderedRoutes.indexOf(this._router.url);
            if ((navigate > 0 && index < 4) || (navigate < 0 && index > 0)) {
                this._router.navigate([this._orderedRoutes[index + navigate]]);
                this._counterService.clearGauge();
            }
        }
    }

    private getPositions(): Position {
        const element = this._host.nativeElement as HTMLDivElement;
        const scroller = element.parentElement?.parentElement;
        const isTop = scroller != null && Math.abs(scroller.scrollTop) < 1;
        const isBottom =
            scroller != null && Math.abs(scroller.scrollHeight - (window.innerHeight + scroller.scrollTop)) < 1;
        return new Position(isTop, isBottom);
    }

    private getMaxDelta(): number {
        this._counterService.percentage = 1;
        return (this._counterService.position === 'top' ? -1 : 1) * 100;
    }

    private updatePositions(deltaY: number, topBarrier: number, bottomBarrier: number, contentSmaller = false) {
        this._position.add(this.getPositions());
        if (this._position.top > 0 && deltaY < 0) {
            if (this._orderedRoutes.indexOf(this._router.url) === 0) {
                this._counterService.clearGauge();
                return;
            }
            const percentage = this._position.top / topBarrier;
            this._counterService.updateGauge('top', percentage);
            if (percentage >= 1) {
                this.checkAndNavigate(deltaY);
            }
        } else if ((this._position.bottom > 0 || contentSmaller) && deltaY > 0) {
            if (this._orderedRoutes.indexOf(this._router.url) === 4) {
                this._counterService.clearGauge();
                return;
            }
            const percentage = (this._position.bottom || bottomBarrier + 1) / bottomBarrier;
            this._counterService.updateGauge('bottom', percentage);
            if (percentage >= 1) {
                this.checkAndNavigate(deltaY);
            }
        } else {
            this._counterService.clearGauge();
        }
    }

    private checkAndNavigate(deltaY: number) {
        if (this._counterService.percentage < 0.99) {
            return;
        }
        if (this._position.top > 0 && deltaY < -1) {
            const index = this._orderedRoutes.indexOf(this._router.url);
            if (index > 0) {
                this._position = new Position();
                this._router.navigate([this._orderedRoutes[index - 1]]);
                this._counterService.clearGauge();
            }
        } else if (this._position.bottom >= 0 && deltaY > 1) {
            const index = this._orderedRoutes.indexOf(this._router.url);
            if (index < 4) {
                this._position = new Position();
                this._router.navigate([this._orderedRoutes[index + 1]]);
                this._counterService.clearGauge();
            }
        }
    }
}
