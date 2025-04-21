import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewEncapsulation, inject } from '@angular/core';

import { LanguageService } from '@lib/services/language.service';
import { SkillsService } from '@lib/services/skills.service';

@Component({
    selector: 'app-skill-measure',
    templateUrl: './skill-measure.component.html',
    styleUrls: ['./skill-measure.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class SkillMeasureComponent implements OnInit, AfterViewInit {
    @Input() value = 0;
    @Input() minValue = 0;
    @Input() name = '';
    @Input() numberOfCircles = 7;

    public circles: { index: number; filled: boolean }[] = [];
    public readonly selectedLanguage$ = inject(LanguageService).getSelectedLanguage();

    private skills = inject(SkillsService);
    private elRef = inject(ElementRef);

    ngOnInit(): void {
        this.circles = Array(this.numberOfCircles)
            .fill(0)
            .map((_, i) => ({ index: i, filled: false }));
        if (this.skills.minified) {
            if (this.minValue && this.value < this.minValue) {
                this.hideComponent();
            }
        }
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            for (const circle of this.circles) {
                circle.filled = circle.index < this.value;
            }
        }, 600);
    }

    hideComponent(): void {
        const element = this.elRef.nativeElement as HTMLElement;
        element.style.display = 'none';
    }
}
