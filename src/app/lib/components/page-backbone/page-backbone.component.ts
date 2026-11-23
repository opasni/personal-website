import { ViewportScroller } from '@angular/common';
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ThemeComponent } from '@lib/abstracts/theme.component';
import { HeaderComponent } from '@lib/components/header/header.component';

@Component({
    selector: 'app-page-backbone',
    templateUrl: './page-backbone.component.html',
    styleUrls: ['./page-backbone.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [HeaderComponent, RouterOutlet, RouterLink, TranslatePipe],
})
export class PageBackboneComponent extends ThemeComponent {
    readonly year = new Date().getFullYear();
    constructor() {
        super();
        inject(ViewportScroller).setOffset(() => [
            0,
            (document.querySelector('app-header')?.getBoundingClientRect().height ?? 84) + 20,
        ]);
    }
}
