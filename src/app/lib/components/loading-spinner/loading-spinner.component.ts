import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { LoaderService } from '@lib/services/loader.service';

@Component({
    selector: 'app-loading-spinner',
    imports: [],
    styleUrls: ['./loading-spinner.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    templateUrl: './loading-spinner.component.html',
})
export class LoadingSpinnerComponent {
    loaderService = inject(LoaderService);
}
