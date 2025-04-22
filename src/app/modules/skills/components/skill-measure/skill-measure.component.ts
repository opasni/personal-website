import { AsyncPipe, NgStyle } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import { LanguageService } from '@lib/services/language.service';
import { SkillsService } from '@lib/services/skills.service';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-skill-measure',
    templateUrl: './skill-measure.component.html',
    styleUrls: ['./skill-measure.component.scss'],
    encapsulation: ViewEncapsulation.None,
    imports: [AsyncPipe, NgStyle, FontAwesomeModule, NgbTooltipModule],
})
export class SkillMeasureComponent implements OnInit, AfterViewInit {
    @Input() value = 0;
    @Input() minValue = 0;
    @Input() name = '';
    @Input() numberOfCircles = 7;
    @Input() infoText: string | null = null;

    faInfoCircle = faInfoCircle;

    public circles: { index: number; filled: boolean }[] = [];
    public readonly selectedLanguage$ = inject(LanguageService).getSelectedLanguage();

    private _skills = inject(SkillsService);
    private _elRef = inject(ElementRef);

    ngOnInit(): void {
        this.circles = Array(this.numberOfCircles)
            .fill(0)
            .map((_, i) => ({ index: i, filled: false }));
        if (this._skills.minified) {
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
        const element = this._elRef.nativeElement as HTMLElement;
        element.style.display = 'none';
    }
}
