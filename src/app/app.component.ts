import { Component, OnInit, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { getLanguage } from './lib/services/language.service';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    imports: [RouterModule],
})
export class AppComponent implements OnInit {
    title = 'Črt Harej';

    private _translate = inject(TranslateService);

    ngOnInit(): void {
        this._translate.setDefaultLang(getLanguage());
    }
}
