import { CommonModule } from '@angular/common';
import { Component, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { GaugeCounterService } from '@lib/services/gauge-counter.service';

@Component({
    selector: 'app-gauge',
    templateUrl: './gauge.component.html',
    styleUrls: ['./gauge.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [CommonModule],
})
export class GaugeComponent {
    private readonly _counterService = inject(GaugeCounterService);

    readonly position = this._counterService.position;
    readonly progress = this._counterService.percentage;
    readonly countdownLabel = computed(() => {
        if (this.progress() >= 1) {
            return 'GO';
        }

        const remaining = Math.ceil((1 - this.progress()) * 3);
        return Math.max(1, remaining).toString();
    });

    movePosition(): void {
        this._counterService.move.emit();
    }
}
