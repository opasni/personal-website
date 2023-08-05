import { AfterViewInit, Component, ElementRef, Input, QueryList, ViewChildren } from '@angular/core';
import { SkillMeasureComponent } from '../components/skill-measure/skill-measure.component';

@Component({
  template: ''
})
export abstract class SectionComponent implements AfterViewInit {

  @ViewChildren(SkillMeasureComponent) skills!: QueryList<SkillMeasureComponent>;
  @ViewChildren('.skills-section') sections!: QueryList<ElementRef>;
  @Input() minified = false;
  @Input() minValue = 4;

  ngAfterViewInit(): void {
    if (this.minified === false) {
      return;
    }
    for (let measure of this.skills) {
      measure.minified = true;
      if (measure.value < this.minValue) {
        measure.hideComponent();
      }
    }
    console.log(this.sections);
  }
}