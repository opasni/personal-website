import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contact } from '@lib/classes/contact.class';

@Injectable({
    providedIn: 'root',
})
export class EmailService {
    private _url = environment.api + '/contact';
    private _http = inject(HttpClient);

    sendEmail(input: Contact): Observable<void> {
        return this._http.post<void>(this._url, input);
    }
}
