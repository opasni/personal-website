import { EventEmitter, Injectable, Output } from '@angular/core';
import { GaugePosition } from 'src/app/types/gauge-position.type';

@Injectable({
  providedIn: 'root'
})
export class GaugeCounterService {

  @Output() update = new EventEmitter<number>();
  @Output() move = new EventEmitter<void>();
  @Output() ready = new EventEmitter<number>();

  public position: GaugePosition = 'none';
  public percentage: number = 0;

  private _counter: number = 0;
  private _intervalId: NodeJS.Timer | undefined;
  private _timer: number = 0;
  private MAX_COUNT = 30;

  updateGauge(position: GaugePosition, value: number) {
    const positionUpdate = value !== 0 ? position : 'none';
    this._counter = value;
    this.handlePositionUpdate(positionUpdate);
    this.sendUpdate();
  }

  clearInterval() {
    clearInterval(this._intervalId);
  }

  clearGauge() {
    this.percentage = 0;
    this.handlePositionUpdate('none');
    this.update.emit(this.percentage)
  }

  private handlePositionUpdate(position: GaugePosition) {
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
        this.sendUpdate();
        if (this._timer === this.MAX_COUNT) {
          clearInterval(this._intervalId);
        }
      }, 40);
    }
    this.position = position;
  }

  private sendUpdate() {
    this.percentage = Math.min(this._counter, this._timer / this.MAX_COUNT, 1);
    this.update.emit(this.percentage);
    if (this.percentage === 1) {
      const delta = this.position === 'top' ? -2 : 2;
      this.ready.emit(delta);
    }
  }
}