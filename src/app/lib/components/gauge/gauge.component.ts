import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, DestroyRef, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { GaugePosition } from '@lib/types/gauge-position.type';
import { GaugeCounterService } from '@lib/services/gauge-counter.service';

@Component({
    selector: 'app-gauge',
    templateUrl: './gauge.component.html',
    styleUrls: ['./gauge.component.scss'],
    imports: [CommonModule],
})
export class GaugeComponent implements OnInit, AfterViewInit {
    @ViewChild('circle') circle!: ElementRef;

    public get position(): GaugePosition {
        return this._counterService.position;
    }

    private _circumference = 0;
    private _currentOffset = 0;
    private _counterService = inject(GaugeCounterService);
    private _destroyRef = inject(DestroyRef);

    ngOnInit(): void {
        this._counterService.update
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((update) => this.setProgress(update));
    }

    ngAfterViewInit(): void {
        const radius = this.circle.nativeElement.r.baseVal.value;
        this._circumference = radius * 2 * Math.PI;

        this.circle.nativeElement.style.strokeDasharray = `${this._circumference} ${this._circumference}`;
        this.circle.nativeElement.style.strokeDashoffset = this._circumference;

        this.setProgress(0);
    }

    movePosition(): void {
        this._counterService.move.emit();
    }

    fillProgress(): void {
        this._currentOffset = this.circle.nativeElement.style.strokeDashoffset;
        this.circle.nativeElement.style.strokeDashoffset = 0;
    }

    resetProgress(): void {
        this.circle.nativeElement.style.strokeDashoffset = this._currentOffset;
        this._currentOffset = 0;
    }

    private setProgress(percent: number) {
        if (this._currentOffset) {
            return;
        }
        const offset = this._circumference - percent * this._circumference;
        this.circle.nativeElement.style.strokeDashoffset = offset;
    }
}
