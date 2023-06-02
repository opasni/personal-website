import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-skill-measure',
  templateUrl: './skill-measure.component.html',
  styleUrls: ['./skill-measure.component.scss']
})
export class SkillMeasureComponent implements OnInit, AfterViewInit {

  @Input() value: number = 0;
  @Input() name: string = '';
  @Input() numberOfCircles: number = 5;

  public circles: { index: number; filled: boolean }[] = [];

  constructor() { }

  ngOnInit() {
    this.circles = Array(this.numberOfCircles).fill(0).map((_, i) => ({ index: i, filled: false }));
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      for (let circle of this.circles) {
        circle.filled = circle.index < this.value
      }
    }, 600);
  }
}
