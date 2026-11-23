import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { EmailService } from '@lib/services/email.service';
import { ContactComponent } from './contact.component';
import translations from '../../../../assets/i18n/en.json';

describe('Embedded contact form', () => {
    let fixture: ComponentFixture<ContactComponent>;
    let sendEmail: jasmine.Spy;

    beforeEach(async () => {
        sendEmail = jasmine.createSpy('sendEmail').and.returnValue(of({}));
        await TestBed.configureTestingModule({
            imports: [ContactComponent],
            providers: [
                provideRouter([]),
                provideTranslateService(),
                { provide: EmailService, useValue: { sendEmail } },
            ],
        }).compileComponents();
        const translate = TestBed.inject(TranslateService);
        translate.setTranslation('en', translations);
        translate.use('en');
        fixture = TestBed.createComponent(ContactComponent);
        fixture.componentRef.setInput('embedded', true);
        fixture.detectChanges();
    });

    it('fits within the page without a duplicate main heading and labels its inputs', () => {
        const form: HTMLElement = fixture.nativeElement;
        expect(form.querySelector('h1')).toBeNull();
        for (const label of Array.from(form.querySelectorAll('label'))) {
            expect(form.querySelector('#' + label.htmlFor)).not.toBeNull();
        }
    });

    it('shows validation errors without sending an incomplete message', () => {
        fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit'));
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toContain('Please enter your name.');
        expect(fixture.nativeElement.textContent).toContain('Please enter your email address.');
        expect(sendEmail).not.toHaveBeenCalled();
    });

    it('uses the contact success URL when submitted from the home page', async () => {
        const navigate = spyOn(TestBed.inject(Router), 'navigate').and.resolveTo(true);
        await fixture.componentInstance.resolved('test-captcha-token');
        expect(sendEmail).toHaveBeenCalledTimes(1);
        expect(navigate).toHaveBeenCalledWith(['/contact/success']);
    });
});
