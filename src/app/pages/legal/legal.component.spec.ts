import { beforeEach, describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { routes } from '../../app.routes';
import en from '../../../assets/i18n/en.json';
import de from '../../../assets/i18n/de.json';
import si from '../../../assets/i18n/si.json';

describe('Legal pages and optional embeds', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideRouter(routes), provideHttpClient(), provideTranslateService()],
        });
        const translate = TestBed.inject(TranslateService);
        for (const [locale, content] of Object.entries({ en, de, si })) {
            translate.setTranslation(locale, content);
        }
        translate.use('en');
    });

    it('provides both notices through the common footer and resolves the German privacy alias', async () => {
        const harness = await RouterTestingHarness.create('/impressum');
        expect(harness.routeNativeElement?.textContent).toContain('7395400000');
        expect(harness.routeNativeElement?.querySelector('.draft-note')).toBeNull();
        expect(harness.routeNativeElement?.querySelector('footer a[href="/privacy"]')).not.toBeNull();
        await harness.navigateByUrl('/datenschutz');
        expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain('Privacy notice');
        expect(harness.routeNativeElement?.querySelector('#turnstile-heading')).not.toBeNull();
        expect(harness.routeNativeElement?.querySelector('footer a[href="/imprint"]')).not.toBeNull();
    });

    it('renders translated privacy sections in all supported languages', async () => {
        const harness = await RouterTestingHarness.create('/privacy');
        const translate = TestBed.inject(TranslateService);
        for (const [locale, title] of [
            ['en', 'Privacy notice'],
            ['de', 'Datenschutzerklärung'],
            ['si', 'Obvestilo o zasebnosti'],
        ]) {
            translate.use(locale);
            harness.detectChanges();
            expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain(title);
            expect(harness.routeNativeElement?.textContent).not.toContain('legal.privacy.');
        }
    });

    it('does not create LinkedIn iframes before opt-in and removes them on withdrawal', async () => {
        const harness = await RouterTestingHarness.create('/linkedin');
        const page = harness.routeNativeElement;
        expect(page).not.toBeNull();
        if (!page) {
            return;
        }
        expect(page.querySelector('iframe')).toBeNull();
        // Detach from the live document so testing consent does not contact LinkedIn.
        harness.fixture.nativeElement.remove();
        const button = page.querySelector<HTMLButtonElement>('.embed-actions button');
        expect(button).not.toBeNull();
        if (!button) {
            return;
        }
        button.click();
        harness.detectChanges();
        expect(page.querySelectorAll('iframe').length).toBe(5);
        button.click();
        harness.detectChanges();
        expect(page.querySelector('iframe')).toBeNull();
    });
});
