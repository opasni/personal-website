import { ApplicationConfig, LOCALE_ID, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LanguageService } from '@lib/services/language.service';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
export const setupLanguageFactory = async (service: LanguageService) => await service.initialize();

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(
				routes,
				withComponentInputBinding(),
				withInMemoryScrolling({ scrollPositionRestoration: 'top', anchorScrolling: 'enabled' }),
		),
		importProvidersFrom(
			BrowserAnimationsModule,
			NgbModule,
			HttpClientModule,
			TranslateModule.forRoot({
					loader: {
							provide: TranslateLoader,
							useFactory: (createTranslateLoader),
							deps: [HttpClient]
					}
			}),
		),
		{ provide: LOCALE_ID, deps: [LanguageService], useFactory: setupLanguageFactory },
	]
};