import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, finalize, map, of, tap } from 'rxjs';
import { RecaptchaComponent } from 'ng-recaptcha';
import { TranslateService } from '@ngx-translate/core';

import { environment } from 'src/environments/environment';
import { Contact } from 'src/app/classes/contact.class';
import { Language } from 'src/app/enums/language.enum';
import { ContactPurpose } from 'src/app/enums/contact-purpose.enum';
import { ThemeComponent } from 'src/app/abstracts/theme.component';
import { ThemeService } from 'src/app/services/theme.service';
import { EmailService } from 'src/app/services/email.service';

class FormGroupAccessor<T> extends FormGroup {
  getControl(key: keyof T): FormControl<any> {
    return this.get(key as string) as FormControl<any>;
  }
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
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

  constructor(
    private contactService: EmailService,
    private translateService: TranslateService,
    private router: Router,
    private route: ActivatedRoute,
    themeService: ThemeService
  ) {
    super(themeService);
  }

  override ngOnInit(): void {
    super.ngOnInit();
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


  resolved(e: string) {
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
