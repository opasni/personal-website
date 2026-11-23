import { ViewportScroller } from '@angular/common';
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeComponent } from '@lib/abstracts/theme.component';
import { HeaderComponent } from '@lib/components/header/header.component';

@Component({
    selector: 'app-page-backbone',
    templateUrl: './page-backbone.component.html',
    styleUrls: ['./page-backbone.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [HeaderComponent, RouterOutlet],
})
export class PageBackboneComponent extends ThemeComponent {
    constructor() {
        super();
        inject(ViewportScroller).setOffset(() => [
            0,
            (document.querySelector('app-header')?.getBoundingClientRect().height ?? 84) + 20,
        ]);
    }
}
