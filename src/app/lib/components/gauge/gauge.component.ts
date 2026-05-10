import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { GaugePosition } from '@lib/types/gauge-position.type';
import { GaugeCounterService } from '@lib/services/gauge-counter.service';

@Component({
    selector: 'app-gauge',
    templateUrl: './gauge.component.html',
    styleUrls: ['./gauge.component.scss'],
    imports: [CommonModule],
})
export class GaugeComponent implements OnInit {
    public get position(): GaugePosition {
        return this._counterService.position;
    }

    public progress = 0;

    public get countdownLabel(): string {
        if (this.progress >= 1) {
            return 'GO';
        }

        const remaining = Math.ceil((1 - this.progress) * 3);
        return Math.max(1, remaining).toString();
    }

    private _counterService = inject(GaugeCounterService);
    private _destroyRef = inject(DestroyRef);

    ngOnInit(): void {
        this._counterService.update
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((update) => (this.progress = update));
    }

    movePosition(): void {
        this._counterService.move.emit();
    }
}
