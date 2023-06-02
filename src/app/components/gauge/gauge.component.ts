import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GaugeCounterService } from 'src/app/services/gauge-counter.service';

@Component({
  selector: 'app-gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.scss']
})
export class GaugeComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('circle') circle!: ElementRef;

  public position: 'top' | 'bottom' | 'none' = 'none';

  private circumference = 0;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private readonly counterService: GaugeCounterService
  ) { }

  ngOnInit(): void {
    this.counterService.update
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(update => {
        this.position = update.position;
        if (update.value === 0) {
          this.position = 'none';
        }
        this.setProgress(Math.min(update.value * 100, 100));
      });
  }

  ngAfterViewInit(): void {
    const radius = this.circle.nativeElement.r.baseVal.value;
    this.circumference = radius * 2 * Math.PI;

    this.circle.nativeElement.style.strokeDasharray = `${this.circumference} ${this.circumference}`;
    this.circle.nativeElement.style.strokeDashoffset = this.circumference;

    this.setProgress(0);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private setProgress(percent: number) {
    const offset = this.circumference - percent / 100 * this.circumference;
    this.circle.nativeElement.style.strokeDashoffset = offset;
  }
}
