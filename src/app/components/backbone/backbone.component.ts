import { AfterViewInit, Component } from '@angular/core';
import { ThemeComponent } from 'src/app/modules/share/abstracts/theme.component';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
	selector: 'app-backbone',
	templateUrl: './backbone.component.html',
	styleUrls: ['./backbone.component.scss']
})
export class BackboneComponent extends ThemeComponent implements AfterViewInit {

	constructor(themeService: ThemeService) {
		super(themeService);
	}

	ngAfterViewInit(): void {
		const loadingElement = document.getElementById('appSplashScreen');
		loadingElement?.remove();
	}
}
