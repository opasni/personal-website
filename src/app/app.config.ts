import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LOCALE_PROVIDER, LanguageService } from '@lib/services/language.service';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
export function initConfig(configService: LanguageService) {
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
		{ provide: APP_INITIALIZER, deps: [LanguageService], useFactory: initConfig, multi: true },
		LOCALE_PROVIDER,
		importProvidersFrom(
			BrowserAnimationsModule,
			NgbModule,
			TranslateModule.forRoot({
					loader: {
							provide: TranslateLoader,
							useFactory: (createTranslateLoader),
							deps: [HttpClient]
					}
			}),
		),
	]
};