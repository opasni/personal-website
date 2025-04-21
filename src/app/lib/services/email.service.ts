import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contact } from '@lib/classes/contact.class';

@Injectable({
    providedIn: 'root',
})
export class EmailService {
    private url = environment.api + '/contact';
    private http = inject(HttpClient);

    sendEmail(input: Contact): Observable<void> {
        return this.http.post<void>(this.url, input);
    }
}
