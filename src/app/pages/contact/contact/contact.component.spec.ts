import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { Subject, of, throwError } from 'rxjs';
import { EmailService } from '@lib/services/email.service';
import { TurnstileService, TurnstileOptions } from '@lib/services/turnstile.service';
import { ContactComponent } from './contact.component';
import translations from '../../../../assets/i18n/en.json';

describe('Embedded contact form', () => {
    let fixture: ComponentFixture<ContactComponent>;
    const sendEmail = vi.fn<EmailService['sendEmail']>();
    const load = vi.fn<TurnstileService['load']>();
    let options: TurnstileOptions;
    const validMessage = { name: 'Test User', replyto: 'test@example.com', subject: 'other', message: 'Hello' };

    beforeEach(async () => {
        sendEmail.mockReset().mockReturnValue(of(undefined));
        load.mockReset().mockResolvedValue({
            render: (_: HTMLElement, config: TurnstileOptions) => {
                options = config;
                return 'widget';
            },
            remove: vi.fn(),
        });
        await TestBed.configureTestingModule({
            imports: [ContactComponent],
            providers: [
                provideRouter([]),
                provideTranslateService(),
                { provide: EmailService, useValue: { sendEmail } },
                { provide: TurnstileService, useValue: { load } },
            ],
        }).compileComponents();
        const translate = TestBed.inject(TranslateService);
        translate.setTranslation('en', translations);
        translate.use('en');
        fixture = TestBed.createComponent(ContactComponent);
        fixture.componentRef.setInput('embedded', true);
        fixture.componentInstance.turnstileSiteKey = 'test-public-key';
        fixture.detectChanges();
    });

    afterEach(() => vi.restoreAllMocks());

    function submitValidForm(): void {
        fixture.componentInstance.emailForm.patchValue(validMessage);
        fixture.componentInstance.onSubmit();
        fixture.detectChanges();
    }

    it('labels the fields without a duplicate main heading or loading Cloudflare on arrival', () => {
        const form: HTMLElement = fixture.nativeElement;
        expect(form.querySelector('h1')).toBeNull();
        for (const label of Array.from(form.querySelectorAll('label'))) {
            expect(form.querySelector('#' + label.htmlFor)).not.toBeNull();
        }
        expect(load).not.toHaveBeenCalled();
        expect(form.querySelector('a[href="/privacy"]')).not.toBeNull();
    });

    it('shows validation errors without loading a widget or sending an incomplete message', () => {
        fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit'));
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toContain('Please enter your name.');
        expect(sendEmail).not.toHaveBeenCalled();
        expect(load).not.toHaveBeenCalled();
    });

    it('sends the Turnstile token in the API payload and navigates only after success', async () => {
        const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
        submitValidForm();
        await fixture.whenStable();
        expect(options.action).toBe('contact');
        expect(sendEmail).not.toHaveBeenCalled();
        await fixture.componentInstance.resolved('fresh-token');
        expect(sendEmail).toHaveBeenCalledExactlyOnceWith(expect.objectContaining({ ...validMessage, turnstileToken: 'fresh-token' }));
        expect(sendEmail.mock.lastCall?.[0]).not.toHaveProperty('recaptcha');
        expect(navigate).toHaveBeenCalledWith(['/contact/success']);
    });

    it('does not accept unsolicited tokens or duplicate callbacks during a request', async () => {
        await fixture.componentInstance.resolved('unsolicited');
        expect(sendEmail).not.toHaveBeenCalled();
        const response = new Subject<void>();
        sendEmail.mockReturnValue(response);
        submitValidForm();
        const pending = fixture.componentInstance.resolved('first');
        await fixture.componentInstance.resolved('duplicate');
        fixture.componentInstance.onSubmit();
        expect(sendEmail).toHaveBeenCalledTimes(1);
        response.complete();
        await pending;
    });

    it('keeps the message after an API error and requires a new verification for retry', async () => {
        sendEmail.mockReturnValue(throwError(() => new Error('API rejected token')));
        const navigate = vi.spyOn(TestBed.inject(Router), 'navigate');
        submitValidForm();
        await fixture.componentInstance.resolved('used-token');
        fixture.detectChanges();
        expect(navigate).not.toHaveBeenCalled();
        expect(fixture.nativeElement.querySelector('button[type="submit"]').textContent).toContain('Try again');
        expect(fixture.componentInstance.emailForm.value.message).toBe(validMessage.message);
        expect(fixture.nativeElement.querySelector('app-turnstile')).toBeNull();
        submitValidForm();
        expect(fixture.nativeElement.querySelector('app-turnstile')).not.toBeNull();
        expect(sendEmail).toHaveBeenCalledTimes(1);
    });

    it('allows a retry after verification expires without sending the message', async () => {
        submitValidForm();
        await fixture.whenStable();
        options['expired-callback']();
        fixture.detectChanges();
        expect(fixture.componentInstance.verify()).toBe(false);
        expect(sendEmail).not.toHaveBeenCalled();
        expect(fixture.nativeElement.querySelector('button[type="submit"]').disabled).toBe(false);
    });

    it('shows an alternative contact method when no site key is configured', () => {
        fixture.componentInstance.turnstileSiteKey = '';
        submitValidForm();
        expect(load).not.toHaveBeenCalled();
        expect(sendEmail).not.toHaveBeenCalled();
        expect(fixture.nativeElement.textContent).toContain('temporarily unavailable');
    });
});
