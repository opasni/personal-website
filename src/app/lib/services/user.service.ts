import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '@lib/classes/user.class';
import { StorageKeys } from '@lib/enums/storage-keys.enum';

@Injectable({
    providedIn: 'root',
})
export class UserApiService {
    private _url = environment.api + '/user';
    private _http = inject(HttpClient);

    userData$: Observable<User> | null = null;

    getUserData(password: string | null): Observable<User> {
        if (!this.userData$) {
            const encryptedPassword = password ?? localStorage.getItem(StorageKeys.ACCESS_KEY);
            const headers = {
                Authorization: `Basic ${encryptedPassword}`,
            };
            this.userData$ = this._http.get<User>(this._url, { headers })
                .pipe(
                    map((data) => new User(data)),
                    shareReplay(1),
                );
        }
        return this.userData$;
    }
}
