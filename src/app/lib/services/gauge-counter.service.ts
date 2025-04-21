import { EventEmitter, Injectable, Output } from '@angular/core';
import { GaugePosition } from '@lib/types/gauge-position.type';

@Injectable({
    providedIn: 'root',
})
export class GaugeCounterService {
    @Output() update = new EventEmitter<number>();
    @Output() move = new EventEmitter<void>();
    @Output() ready = new EventEmitter<number>();

    public position: GaugePosition = 'none';
    public percentage = 0;

    private _counter = 0;
    private _intervalId!: NodeJS.Timeout;
    private _timer = 0;
    private _maxCount = 30;

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
        this.percentage = 0;
        this._handlePositionUpdate('none');
        this.update.emit(this.percentage);
    }

    private _handlePositionUpdate(position: GaugePosition): void {
        // If the same, nothing to do here.
        if (this.position === position) {
            return;
        }
        // If position change, reset the timer first.
        if (this.position !== position) {
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
        this.position = position;
    }

    private _sendUpdate(): void {
        this.percentage = Math.min(this._counter, this._timer / this._maxCount, 1);
        this.update.emit(this.percentage);
        if (this.percentage === 1) {
            const delta = this.position === 'top' ? -2 : 2;
            this.ready.emit(delta);
        }
    }
}
