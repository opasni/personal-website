import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, finalize, map, of, tap } from 'rxjs';
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
  standalone: true,
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  imports: [
    CommonModule,
    FilterErrorPipe,
    ReactiveFormsModule,
    RecaptchaModule,
    ScrollDetectDirective,
    TranslateModule
  ]
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

  onSubmit() {
    this.submitted = true;
    this.fail = false;
    if (!this.emailForm.valid) {
      this.emailForm.markAllAsTouched();
      return;
    }
    const contactData = new Contact(this.emailForm.value);
    this.submitter$ = this.contactService.sendEmail(contactData)
      .pipe(
        map(data => {
          if (data.contactId === null) {
            this.submitted = false;
            return false;
          }
          this.emailForm.getControl('contactId').setValue(data.contactId);
          this.verify = true;
          return true;
        }),
        catchError(() => {
          this.submitted = false;
          return of(false);
        })
      );
  }


  resolved(e: string | null) {
    if (!e) {
      return;
    }
    const data = {
      contactId: this.emailForm.getControl('contactId').value,
      recaptcha: e
    };
    this.submitter$ = this.contactService.verifySender(data).pipe(
      tap(success => {
        if (success) {
          this.router.navigate(['success'], { relativeTo: this.route })
        } else {
          this.fail = true;
          if (this.recaptcha) {
            this.recaptcha.reset();
          }
        }
      }),
      finalize(() => this.verify = false)
    );
  }
}
