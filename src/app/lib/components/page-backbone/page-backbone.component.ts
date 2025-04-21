import { Component, HostListener, OnInit, inject } from '@angular/core';
import { ChildrenOutletContexts, RouterModule } from '@angular/router';

import { ROUTE_ANIMATION } from '@lib/consts/transitions.const';
import { ThemeComponent } from '@lib/abstracts/theme.component';
import { CommonModule } from '@angular/common';
import { GaugeComponent } from '@lib/components/gauge/gauge.component';
import { HeaderComponent } from '@lib/components/header/header.component';

@Component({
    selector: 'app-page-backbone',
    templateUrl: './page-backbone.component.html',
    styleUrls: ['./page-backbone.component.scss'],
    imports: [CommonModule, GaugeComponent, HeaderComponent, RouterModule],
    animations: [ROUTE_ANIMATION],
})
export class PageBackboneComponent extends ThemeComponent implements OnInit {
    public menuWidth = 280;
    public paddingLeft = 3;

    private _contexts = inject(ChildrenOutletContexts);

    @HostListener('window:resize', ['$event'])
    onResize(): void {
        this._setParams();
    }

    ngOnInit(): void {
        this._setParams();
        document.body.style.overflowY = 'hidden';
    }

    getRouteAnimation(): { value: string; params: { menuWidth: number; paddingLeft: number } } {
        return {
            value: this._contexts.getContext('primary')?.route?.snapshot?.data?.['animation'],
            params: {
                menuWidth: this.menuWidth,
                paddingLeft: this.paddingLeft,
            },
        };
    }

    private _setParams() {
        if (window.innerWidth < 576) {
            this.menuWidth = 0;
            this.paddingLeft = 0;
        } else if (window.innerWidth < 968) {
            this.menuWidth = 0;
            this.paddingLeft = 3;
        } else {
            this.menuWidth = 280;
            this.paddingLeft = 3;
        }
    }
}
