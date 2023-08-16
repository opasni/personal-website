import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { Observable, catchError, map, of } from 'rxjs'
import { environment } from 'src/environments/environment'
import { Contact } from 'src/app/classes/contact.class';

@Injectable({
  providedIn: 'root'
})

export class EmailService {
  private url = environment.api + '/contact';
	private http = inject(HttpClient);

  sendEmail(input: Contact): Observable<Contact> {
    return this.http.post(this.url, input).pipe(
      map((data: Partial<Contact>) => {
        input.contactId = data.contactId ?? null;
        return input;
      }),
      catchError(error => {
        console.error(error);
        return of(input);
      })
    );
  }

  verifySender(input: { contactId: string, recaptcha: string }): Observable<boolean> {
    return this.http.post(this.url + '/recaptcha', input).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}