import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ThemeComponent } from '@lib/abstracts/theme.component';
import { CommonModule } from '@angular/common';
import { GaugeComponent } from '@lib/components/gauge/gauge.component';
import { HeaderComponent } from '@lib/components/header/header.component';

@Component({
    selector: 'app-page-backbone',
    templateUrl: './page-backbone.component.html',
    styleUrls: ['./page-backbone.component.scss'],
    imports: [CommonModule, GaugeComponent, HeaderComponent, RouterModule],
})
export class PageBackboneComponent extends ThemeComponent implements OnInit {
    ngOnInit(): void {
        document.body.style.overflowY = 'hidden';
    }
}
