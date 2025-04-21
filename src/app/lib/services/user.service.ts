import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '@lib/classes/user.class';

@Injectable({
    providedIn: 'root',
})
export class UserApiService {
    private _url = environment.api + '/user';
    private _http = inject(HttpClient);

    getUserData(password: string | null): Observable<User> {
        const params: Partial<{ password: string }> = {};
        if (password != null) {
            params.password = password;
        }
        return this._http.get<User>(this._url, { params }).pipe(map((data) => new User(data)));
    }
}
