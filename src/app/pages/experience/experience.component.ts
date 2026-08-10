import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { ScrollDetectDirective } from '@lib/directives/scroll-detect/scroll-detect.directive';
import { ThemeComponent } from '@lib/abstracts/theme.component';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-experience',
    templateUrl: './experience.component.html',
    styleUrls: ['./experience.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [CommonModule, NgbAccordionModule, TranslatePipe, ScrollDetectDirective],
})
export class ExperienceComponent extends ThemeComponent {
    readonly highlightedProjects = [
        'job-car',
        'caroline',
        'catena-x',
        'audi-frequency',
        'dak',
        'scania',
        'squadcheck',
        'vw-ai',
        'felicia',
        'wordpress',
        'alice',
        'fapos',
        'pak',
        'crashtool',
    ];
}
