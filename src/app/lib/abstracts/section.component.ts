import { Component, ElementRef, Input, QueryList, ViewChildren, ChangeDetectionStrategy } from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.Eager,
    template: '',
})
export abstract class SectionComponent {
    @ViewChildren('.skills-section') sections!: QueryList<ElementRef>;
    @Input() summarized = false;
    @Input() minValue = 4;
}
