import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { GaugePosition } from '@lib/types/gauge-position.type';
import { GaugeCounterService } from '@lib/services/gauge-counter.service';

@Component({
  selector: 'app-gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.scss'],
  standalone: true,
  imports: [ CommonModule ]
})
export class GaugeComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('circle') circle!: ElementRef;

  public get position(): GaugePosition {
    return this.counterService.position;
  }

  private unsubscribe$ = new Subject<void>();
  private _circumference = 0;
  private _currentOffset = 0;
  private readonly counterService = inject(GaugeCounterService);

  ngOnInit(): void {
    this.counterService.update
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(update => this.setProgress(update));
  }

  ngAfterViewInit(): void {
    const radius = this.circle.nativeElement.r.baseVal.value;
    this._circumference = radius * 2 * Math.PI;

    this.circle.nativeElement.style.strokeDasharray = `${this._circumference} ${this._circumference}`;
    this.circle.nativeElement.style.strokeDashoffset = this._circumference;

    this.setProgress(0);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  movePosition() {
    this.counterService.move.emit();
  }

  fillProgress() {
    this._currentOffset = this.circle.nativeElement.style.strokeDashoffset;
    this.circle.nativeElement.style.strokeDashoffset = 0;
  }

  resetProgress() {
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
