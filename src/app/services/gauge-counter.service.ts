import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GaugeCounterService {

  @Output() update = new EventEmitter<{ position: 'top' | 'bottom' | 'none', value: number }>();

  updateGauge(position: 'top' | 'bottom', value: number) {
    this.update.emit({ position, value });
  }

  clearGauge() {
    this.update.emit({ position: 'none', value: 0 })
  }
}