import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GaugePosition } from 'src/app/modules/share/types/gauge-position.type';
import { GaugeCounterService } from 'src/app/services/gauge-counter.service';

@Component({
  selector: 'app-gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.scss']
})
export class GaugeComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('circle') circle!: ElementRef;

  public get position(): GaugePosition {
    return this.counterService.position;
  }

  private unsubscribe$ = new Subject<void>();
  private _circumference = 0;

  constructor(
    private readonly counterService: GaugeCounterService
  ) { }

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

  private setProgress(percent: number) {
    const offset = this._circumference - percent * this._circumference;
    this.circle.nativeElement.style.strokeDashoffset = offset;
  }
}
