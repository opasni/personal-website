import { AfterViewInit, Directive, ElementRef, HostListener, OnDestroy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { Position } from '@lib/classes/position.class';
import { GaugeCounterService } from '@lib/services/gauge-counter.service';

@Directive({
	selector: '[appScrollDetect]',
	standalone: true
})
export class ScrollDetectDirective implements AfterViewInit, OnDestroy {
	private _orderedRoutes = [
		'/about',
		'/skills',
		'/experience',
		'/education',
		'/contact'
	];

	private _position = new Position();
	private _defaultTouch = { x: 0, y: 0 };
	private unsubscribe$ = new Subject<void>();

	private host = inject(ElementRef);
	private router = inject(Router);
	private counterService = inject(GaugeCounterService);

	ngAfterViewInit(): void {
		this._position = this.getPositions();
		this.counterService.ready
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe(deltaY => this.checkAndNavigate(deltaY));;
		this.counterService.move
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe(() => this.checkAndNavigate(this.getMaxDelta()));
	}

	ngOnDestroy(): void {
		this.counterService.clearGauge();
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}

	@HostListener('touchstart', ['$event'])
	@HostListener('touchmove', ['$event'])
	@HostListener('touchend', ['$event'])
	handleTouch(event: TouchEvent) {
		if (!this.host.nativeElement) {
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

	@HostListener('wheel', ['$event']) onMousewheel(event: WheelEvent) {
		if (!this.host.nativeElement) {
			return;
		}
		this.updatePositions(event.deltaY, 12, 12);
	}

	@HostListener('document:keyup', ['$event'])
	handleKeyboardEvent(event: KeyboardEvent) {
		const navigate = event.key === 'ArrowDown' ? 1 : event.key === 'ArrowUp' ? -1 : 0;
		if (navigate !== 0) {
			const index = this._orderedRoutes.indexOf(this.router.url);
			if ((navigate > 0 && index < 4) || (navigate < 0 && index > 0)) {
				this.router.navigate([this._orderedRoutes[index + navigate]]);
				this.counterService.clearGauge();
			}
		}
	}

	private getPositions(): Position {
		const element = this.host.nativeElement as HTMLDivElement;
		const scroller = element.parentElement?.parentElement;
		const isTop = scroller != null && Math.abs(scroller.scrollTop) < 1;
		const isBottom = scroller != null && Math.abs(scroller.scrollHeight - (window.innerHeight + scroller.scrollTop)) < 1;
		return new Position(isTop, isBottom);
	}

	private getMaxDelta(): number {
		this.counterService.percentage = 1;
		return (this.counterService.position === 'top' ? -1 : 1) * 100;
	}

	private updatePositions(deltaY: number, topBarrier: number, bottomBarrier: number) {
		this._position.add(this.getPositions());
		if (this._position.top > 0 && deltaY < 0) {
			if (this._orderedRoutes.indexOf(this.router.url) === 0) {
				this.counterService.clearGauge();
				return;
			}
			const percentage = this._position.top / topBarrier;
			this.counterService.updateGauge('top', percentage);
			if (percentage >= 1) {
				this.checkAndNavigate(deltaY);
			}
		} else if (this._position.bottom >= 0 && deltaY > 0) {
			if (this._orderedRoutes.indexOf(this.router.url) === 4) {
				this.counterService.clearGauge();
				return;
			}
			const percentage = (this._position.bottom || bottomBarrier + 1) / bottomBarrier;
			this.counterService.updateGauge('bottom', percentage);
			if (percentage >= 1) {
				this.checkAndNavigate(deltaY);
			}
		} else {
			this.counterService.clearGauge();
		}
	}

	private checkAndNavigate(deltaY: number) {
		if (this.counterService.percentage < 0.99) {
			return;
		}
		if (this._position.top > 0 && deltaY < -1) {
			const index = this._orderedRoutes.indexOf(this.router.url);
			if (index > 0) {
				this._position = new Position();
				this.router.navigate([this._orderedRoutes[index - 1]]);
				this.counterService.clearGauge();
			}
		} else if (this._position.bottom >= 0 && deltaY > 1) {
			const index = this._orderedRoutes.indexOf(this.router.url);
			if (index < 4) {
				this._position = new Position();
				this.router.navigate([this._orderedRoutes[index + 1]]);
				this.counterService.clearGauge();
			}
		}
	}
}