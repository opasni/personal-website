import { EventEmitter, Injectable, signal } from '@angular/core';
import { GaugePosition } from '@lib/types/gauge-position.type';

@Injectable({
    providedIn: 'root',
})
export class GaugeCounterService {
    readonly move = new EventEmitter<void>();
    readonly ready = new EventEmitter<number>();
    readonly position = signal<GaugePosition>('none');
    readonly percentage = signal(0);

    private _counter = 0;
    private _intervalId!: ReturnType<typeof setInterval>;
    private _timer = 0;
    private _maxCount = 45;

    updateGauge(position: GaugePosition, value: number): void {
        const positionUpdate = value !== 0 ? position : 'none';
        this._counter = value;
        this._handlePositionUpdate(positionUpdate);
        this._sendUpdate();
    }

    clearInterval(): void {
        clearInterval(this._intervalId);
    }

    clearGauge(): void {
        this.percentage.set(0);
        this._handlePositionUpdate('none');
    }

    private _handlePositionUpdate(position: GaugePosition): void {
        // If the same, nothing to do here.
        if (this.position() === position) {
            return;
        }
        // If position change, reset the timer first.
        if (this.position() !== position) {
            this._timer = 0;
            clearInterval(this._intervalId);
        }
        if (position !== 'none') {
            this._intervalId = setInterval(() => {
                this._timer = this._timer + 1;
                this._sendUpdate();
                if (this._timer === this._maxCount) {
                    clearInterval(this._intervalId);
                }
            }, 40);
        }
        this.position.set(position);
    }

    private _sendUpdate(): void {
        const percentage = Math.min(this._counter, this._timer / this._maxCount, 1);
        this.percentage.set(percentage);
        if (percentage === 1) {
            const delta = this.position() === 'top' ? -2 : 2;
            this.ready.emit(delta);
        }
    }
}
