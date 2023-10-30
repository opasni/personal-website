import { Component, HostListener, OnInit, inject } from '@angular/core';
import { ChildrenOutletContexts, RouterModule } from '@angular/router';

import { ROUTE_ANIMATION } from '@lib/consts/transitions.const';
import { ThemeComponent } from '@lib/abstracts/theme.component';
import { ThemeService } from '@lib/services/theme.service';
import { CommonModule } from '@angular/common';
import { GaugeComponent } from '@lib/components/gauge/gauge.component';
import { HeaderComponent } from '@lib/components/header/header.component';

@Component({
	standalone: true,
	selector: 'app-backbone',
	templateUrl: './backbone.component.html',
	styleUrls: ['./backbone.component.scss'],
	imports: [
		CommonModule,
		GaugeComponent,
		HeaderComponent,
		RouterModule,
	],
  animations: [
    ROUTE_ANIMATION
  ]
})
export class BackboneComponent extends ThemeComponent implements OnInit {
	public menuWidth = 280;
	public paddingLeft = 3;

	@HostListener('window:resize', ['$event'])
	onResize() {
		this.setParams();
	}

	private contexts = inject(ChildrenOutletContexts);

	ngOnInit(): void {
		this.setParams();
		document.body.style.overflowY = 'hidden';
	}

	getRouteAnimation() {
		return {
			value: this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'],
			params: {
				menuWidth: this.menuWidth,
				paddingLeft: this.paddingLeft
			}
		}
	}

	private setParams() {
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
