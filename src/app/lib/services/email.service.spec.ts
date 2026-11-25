import { describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { EmailService } from './email.service';
import { Contact } from '@lib/classes/contact.class';
import { environment } from '@env/environment';

describe('Contact API contract', () => {
    it('maps the form fields to the deployed Lambda payload', () => {
        TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
        const http = TestBed.inject(HttpTestingController);
        TestBed.inject(EmailService)
            .sendEmail(
                new Contact({
                    name: 'Test',
                    replyto: 'test@example.com',
                    subject: 'other',
                    message: 'Hello',
                    _honeypot: '',
                    turnstileToken: 'token',
                }),
            )
            .subscribe();
        const request = http.expectOne(environment.apiUrl + '/contact');
        expect(request.request.body).toEqual({
            name: 'Test',
            email: 'test@example.com',
            message: 'other\n\nHello',
            website: '',
            turnstileToken: 'token',
        });
        request.flush({ message: 'Message sent.' });
        http.verify();
    });
});
