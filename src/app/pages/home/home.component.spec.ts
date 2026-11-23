import { TestBed } from '@angular/core/testing';
import { provideRouter, Router, withRouterConfig } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { routes } from '../../app.routes';
import translations from '../../../assets/i18n/en.json';

describe('One-page navigation', () => {
    let harness: RouterTestingHarness;
    let router: Router;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            providers: [
                provideRouter(routes, withRouterConfig({ onSameUrlNavigation: 'reload' })),
                provideHttpClient(),
                provideTranslateService(),
            ],
        });
        const translate = TestBed.inject(TranslateService);
        translate.setTranslation('en', translations);
        translate.use('en');
        router = TestBed.inject(Router);
        harness = await RouterTestingHarness.create('/');
    });

    it('keeps the old about URL working and shows the full page', async () => {
        await harness.navigateByUrl('/about');
        expect(router.url).toBe('/#about');
        expect(harness.routeNativeElement?.querySelectorAll('h1').length).toBe(1);
        expect(harness.routeNativeElement?.querySelector('#personal')?.textContent).toContain('Camino de Santiago');
    });

    it('keeps every main navigation link on the page with a matching target', () => {
        const page = harness.routeNativeElement;
        expect(page).not.toBeNull();
        if (!page) {
            return;
        }
        const links = Array.from(page.querySelectorAll('#main-nav a'));
        expect(links.length).toBe(6);
        for (const link of links) {
            const href = link.getAttribute('href');
            expect(href).not.toBeNull();
            if (!href) {
                return;
            }
            expect(href.startsWith('/#')).toBeTrue();
            expect(page.querySelector(href.slice(1))).not.toBeNull();
        }
    });

    it('preserves expanded project details when moving between sections', async () => {
        const project = harness.routeNativeElement?.querySelector<HTMLDetailsElement>('.project details');
        expect(project).not.toBeNull();
        if (!project) {
            return;
        }
        project.open = true;
        await harness.navigateByUrl('/#personal');
        expect(harness.routeNativeElement?.querySelector('.project details')).toBe(project);
        expect(project.open).toBeTrue();
    });

    it('does not navigate away when scrolling or pressing arrow keys', async () => {
        await harness.navigateByUrl('/#work');
        const home = harness.routeNativeElement?.querySelector('app-home');
        expect(home).not.toBeNull();
        if (!home) {
            return;
        }
        home.dispatchEvent(new WheelEvent('wheel', { deltaY: 1000, bubbles: true }));
        document.dispatchEvent(new KeyboardEvent('keyup', { key: 'ArrowDown', bubbles: true }));
        await harness.fixture.whenStable();
        expect(router.url).toBe('/#work');
    });
});
