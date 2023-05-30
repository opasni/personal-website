import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackboneComponent } from './components/backbone/backbone.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { LanguageService } from './services/language.service';
import { ShareModule } from './modules/share/share.module';
import { HeaderModule } from './modules/header/header.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EmailService } from './services/email.service';

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
export const setupLanguageFactory = (service: LanguageService) => service.initialize();

@NgModule({
    declarations: [
        AppComponent,
        BackboneComponent
    ],
    imports: [
        BrowserModule,
        NgbModule,
        ShareModule,
        HeaderModule,
        HttpClientModule,
        AppRoutingModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        FontAwesomeModule,
    ],
    providers: [
        { provide: LOCALE_ID, deps: [LanguageService], useFactory: setupLanguageFactory },
        EmailService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
