import { Component, OnInit, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { getLanguage } from './lib/services/language.service';
import { RouterModule } from '@angular/router';

@Component({
    standalone: true,
    selector: 'app-root',
    templateUrl: './app.component.html',
    imports: [RouterModule]
})
export class AppComponent implements OnInit {
    title = 'Črt Harej';

    private translate = inject(TranslateService);

    ngOnInit(): void {
        this.translate.setDefaultLang(getLanguage());
    }
}
