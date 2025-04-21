import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, finalize, firstValueFrom, of, tap } from 'rxjs';
import { RecaptchaComponent, RecaptchaModule } from 'ng-recaptcha-2';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { environment } from 'src/environments/environment';
import { Contact } from '@lib/classes/contact.class';
import { Language } from '@lib/enums/language.enum';
import { ContactPurpose } from '@lib/enums/contact-purpose.enum';
import { ThemeComponent } from '@lib/abstracts/theme.component';
import { EmailService } from '@lib/services/email.service';
import { CommonModule } from '@angular/common';
import { FilterErrorPipe } from '@lib/pipes/filter-error/filter-error.pipe';
import { ScrollDetectDirective } from '@lib/directives/scroll-detect/scroll-detect.directive';

class FormGroupAccessor<T> extends FormGroup {
    getControl(key: keyof T): FormControl<any> {
        return this.get(key as string) as FormControl<any>;
    }
}

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
    imports: [
        CommonModule,
        FilterErrorPipe,
        ReactiveFormsModule,
        RecaptchaModule,
        ScrollDetectDirective,
        TranslateModule,
    ],
})
export class ContactComponent extends ThemeComponent implements OnInit {
    @ViewChild(RecaptchaComponent) recaptcha!: RecaptchaComponent;

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
    recaptchaKey = environment.recaptcha;

    public submitter$!: Observable<boolean>;
    public submitted = false;
    public verify = false;
    public fail = false;

    private contactService = inject(EmailService);
    private translateService = inject(TranslateService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);

    ngOnInit(): void {
        this.emailForm.getControl('languageId').setValue(this.translateService.currentLang);
    }

    onSubmit(): void {
        this.submitted = true;
        this.fail = false;
        if (!this.emailForm.valid) {
            this.emailForm.markAllAsTouched();
            return;
        }
        this.verify = true;
    }

    async resolved(e: string | null): Promise<void> {
        if (!e) {
            return;
        }

        const contactData = new Contact(this.emailForm.value);
        contactData.recaptcha = e;

        await firstValueFrom(
            this.contactService.sendEmail(contactData).pipe(
                tap(() => {
                    this.router.navigate(['success'], { relativeTo: this.route });
                }),
                catchError(() => {
                    this.fail = true;
                    if (this.recaptcha) {
                        this.recaptcha.reset();
                    }
                    return of(null);
                }),
                finalize(() => (this.verify = false)),
            ),
            { defaultValue: null },
        );
    }
}
