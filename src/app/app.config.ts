import { ApplicationConfig, importProvidersFrom, inject, provideAppInitializer } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideTranslateService } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LOCALE_PROVIDER, LanguageService } from '@lib/services/language.service';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

type AppInitializer = () => Promise<void>;

export function initConfig(configService: LanguageService): AppInitializer {
    return () => configService.initialize();
}

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(
            routes,
            withComponentInputBinding(),
            withInMemoryScrolling({ scrollPositionRestoration: 'top', anchorScrolling: 'enabled' }),
        ),
        provideHttpClient(),
        provideTranslateService({
            loader: provideTranslateHttpLoader({
                prefix: '/assets/i18n/',
                suffix: '.json',
            }),
            fallbackLang: 'en',
            lang: 'en',
        }),
        provideAppInitializer(() => {
            const initializerFn = initConfig(inject(LanguageService));
            return initializerFn();
        }),
        LOCALE_PROVIDER,
        importProvidersFrom(NgbModule),
    ],
};
