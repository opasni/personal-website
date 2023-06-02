import { AfterViewInit, Directive, ElementRef, HostListener, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Position } from '../../classes/position.class';
import { GaugeCounterService } from 'src/app/services/gauge-counter.service';

@Directive({
	selector: '[appScrollDetect]'
})
export class ScrollDetectDirective implements AfterViewInit, OnDestroy {

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
		private router: Router,
		private readonly counterService: GaugeCounterService
	) { }

	ngAfterViewInit(): void {
		this._position = this.getPositions();
	}

	ngOnDestroy(): void {
		this.counterService.clearGauge();
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
		this.updatePositions(event.deltaY, 68, 18);
	}

	private getPositions(): Position {
		const element = this.host.nativeElement as HTMLDivElement;
		const scroller = element.parentElement?.parentElement;
		const isTop = scroller != null && Math.abs(scroller.scrollTop) < 1;
		const isBottom = scroller != null && Math.abs(scroller.scrollHeight - (window.innerHeight + scroller.scrollTop)) < 1;
		return new Position(isTop, isBottom);
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
		} else if (this._position.bottom > 0 && deltaY > 0) {
			if (this._orderedRoutes.indexOf(this.router.url) === 4) {
				this.counterService.clearGauge();
				return;
			}
			const percentage = this._position.bottom / bottomBarrier;
			this.counterService.updateGauge('bottom', percentage);
			if (percentage >= 1) {
				this.checkAndNavigate(deltaY);
			}
		} else {
			this.counterService.clearGauge();
		}
	}

	private checkAndNavigate(deltaY: number) {
		if (this._position.top > 0 && deltaY < -1) {
			const index = this._orderedRoutes.indexOf(this.router.url);
			if (index > 0) {
				this._position = new Position();
				this.router.navigate([this._orderedRoutes[index - 1]]);
				this.counterService.clearGauge();
			}
		} else if (this._position.bottom > 0 && deltaY > 1) {
			const index = this._orderedRoutes.indexOf(this.router.url);
			if (index < 4) {
				this._position = new Position();
				this.router.navigate([this._orderedRoutes[index + 1]]);
				this.counterService.clearGauge();
			}
		}
	}
}
