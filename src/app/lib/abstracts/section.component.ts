import { Component, ElementRef, Input, QueryList, ViewChildren } from '@angular/core';

@Component({
  template: ''
})
export abstract class SectionComponent {

  @ViewChildren('.skills-section') sections!: QueryList<ElementRef>;
  @Input() summarized = false;
  @Input() minValue = 4;
}