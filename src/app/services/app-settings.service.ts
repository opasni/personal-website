import { Injectable } from '@angular/core';

import { BaseCookieService } from './templates/base-cookie.service';
import { CookieService } from 'ngx-cookie-service';
import { Language } from '../modules/share/enums/language.enum';

interface AppSettingsData {
    language: Language;
    cookieVersion: string;
}

@Injectable({
    providedIn: 'root',
})
export class AppSettingsService extends BaseCookieService<AppSettingsData> {
    private readonly loginCookieName: string = 'ch-cv-token';

    constructor(cookieService: CookieService) {
        super('ch-cv-token', '1.0.0', cookieService);
    }

    protected getDefaultCookieData(): AppSettingsData {
        return {
            language: Language.EN,
            cookieVersion: this.cookieVersion,
        };
    }
}
