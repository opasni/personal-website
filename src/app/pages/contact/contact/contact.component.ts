import { Component, DestroyRef, Input, OnInit, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { catchError, finalize, firstValueFrom, of, tap, timeout } from 'rxjs';
import { TurnstileComponent } from '@lib/components/turnstile/turnstile.component';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { environment } from '@env/environment';
import { Contact } from '@lib/classes/contact.class';
import { Language } from '@lib/enums/language.enum';
import { ContactPurpose } from '@lib/enums/contact-purpose.enum';
import { ThemeComponent } from '@lib/abstracts/theme.component';
import { EmailService } from '@lib/services/email.service';
import { FilterErrorPipe } from '@lib/pipes/filter-error/filter-error.pipe';

class FormGroupAccessor<T> extends FormGroup {
    getControl(key: keyof T): FormControl<any> {
        return this.get(key as string) as FormControl<any>;
    }
}

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [CommonModule, FilterErrorPipe, ReactiveFormsModule, TurnstileComponent, TranslatePipe, RouterLink],
})
export class ContactComponent extends ThemeComponent implements OnInit {
    @Input() embedded = false;

    public emailForm = new FormGroupAccessor<Contact>({
        contactId: new FormControl<string | null>(null),
        name: new FormControl<string | null>(null, Validators.required),
        replyto: new FormControl<string | null>(null, [Validators.required, Validators.email]),
        message: new FormControl<string | null>(null, Validators.required),
        subject: new FormControl<ContactPurpose | null>(null, Validators.required),
        _honeypot: new FormControl<string | null>(null),
        languageId: new FormControl<Language>(Language.EN),
    });

    Purpose: typeof ContactPurpose = ContactPurpose;
    turnstileSiteKey = environment.turnstileSiteKey;

    public readonly submitted = signal(false);
    public readonly verify = signal(false);
    public readonly fail = signal(false);
    public readonly sending = signal(false);
    public readonly unavailable = signal(false);

    private _contactService = inject(EmailService);
    private _translateService = inject(TranslateService);
    private _router = inject(Router);
    private readonly _destroyRef = inject(DestroyRef);

    ngOnInit(): void {
        this.emailForm.getControl('languageId').setValue(this._translateService.currentLang);
    }

    onSubmit(): void {
        if (this.verify() || this.sending()) {
            return;
        }
        this.submitted.set(true);
        this.fail.set(false);
        if (!this.emailForm.valid) {
            this.emailForm.markAllAsTouched();
            return;
        }
        if (!this.turnstileSiteKey) {
            this.unavailable.set(true);
            return;
        }
        this.unavailable.set(false);
        this.verify.set(true);
    }

    verificationFailed(): void {
        if (this.sending()) {
            return;
        }
        this.verify.set(false);
        this.fail.set(true);
    }

    async resolved(e: string | null): Promise<void> {
        if (!e || !this.verify() || this.sending()) {
            return;
        }
        if (this.emailForm.invalid) {
            this.verificationFailed();
            return;
        }
        this.sending.set(true);

        const contactData = new Contact(this.emailForm.value);
        contactData.turnstileToken = e;

        await firstValueFrom(
            this._contactService.sendEmail(contactData).pipe(
                timeout(20000),
                takeUntilDestroyed(this._destroyRef),
                tap(() => {
                    this._router.navigate(['/contact/success']);
                }),
                catchError(() => {
                    this.fail.set(true);
                    return of(null);
                }),
                finalize(() => {
                    this.verify.set(false);
                    this.sending.set(false);
                }),
            ),
            { defaultValue: null },
        );
    }
}
