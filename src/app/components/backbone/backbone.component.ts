import { Component, HostListener } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { ThemeComponent } from 'src/app/modules/share/abstracts/theme.component';
import { ROUTE_ANIMATION } from 'src/app/modules/share/consts/transitions.const';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
	selector: 'app-backbone',
	templateUrl: './backbone.component.html',
	styleUrls: ['./backbone.component.scss'],
  animations: [
    ROUTE_ANIMATION
  ]
})
export class BackboneComponent extends ThemeComponent {

	public menuWidth = 280;
	public paddingLeft = 3;

	@HostListener('window:resize', ['$event'])
	onResize() {
		this.setParams();
	}

	constructor(themeService: ThemeService, private contexts: ChildrenOutletContexts) {
		super(themeService);
		this.setParams();
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
