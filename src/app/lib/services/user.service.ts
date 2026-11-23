import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { environment } from '@env/environment';
import { User } from '@lib/classes/user.class';
import { StorageKeys } from '@lib/enums/storage-keys.enum';

@Service()
export class UserApiService {
    private _url = environment.apiUrl + '/user';
    private _http = inject(HttpClient);

    userData$: Observable<User> | null = null;

    getUserData(password: string | null, language: string = 'en'): Observable<User> {
        if (!this.userData$) {
            const encryptedPassword = password ?? localStorage.getItem(StorageKeys.ACCESS_KEY);
            const headers = {
                Authorization: `Basic ${encryptedPassword}`,
            };
            const params = {
                lang: language,
            };
            this.userData$ = this._http.get<User>(this._url, { headers, params }).pipe(
                map((data) => new User(data)),
                shareReplay(1),
            );
        }
        return this.userData$;
    }
}
