
import { Component, inject } from '@angular/core';
import { LoaderService } from '@lib/services/loader.service';


@Component({
    selector: 'app-loading-spinner',
    imports: [],
    styleUrls: ['./loading-spinner.component.scss'],
    templateUrl: './loading-spinner.component.html'
})
export class LoadingSpinnerComponent {
	loaderService = inject(LoaderService);
}
