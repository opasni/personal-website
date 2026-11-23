import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Contact } from '@lib/classes/contact.class';

@Service()
export class EmailService {
    private _url = environment.apiUrl + '/contact';
    private _http = inject(HttpClient);

    sendEmail(input: Contact): Observable<void> {
        return this._http.post<void>(this._url, {
            name: input.name,
            email: input.replyto,
            message: [input.subject, input.message].filter(Boolean).join('\n\n'),
            website: input._honeypot,
            turnstileToken: input.turnstileToken,
        });
    }
}
