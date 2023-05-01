import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { getLanguage } from './services/language.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'Crt Harej';

    constructor(
        private translate: TranslateService
    ) { }

    ngOnInit(): void {
        this.translate.setDefaultLang(getLanguage());
    }
}
