import { Component } from '@angular/core';

@Component({
  selector: 'app-backbone',
  templateUrl: './backbone.component.html',
  styleUrls: ['./backbone.component.scss']
})
export class BackboneComponent {

    ngAfterViewInit(): void {
        const loadingElement = document.getElementById('appSplashScreen');
        loadingElement?.remove();
    }

}
