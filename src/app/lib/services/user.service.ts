import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '@lib/classes/user.class';

@Injectable({
	providedIn: 'root'
})
export class UserApiService {
	private url = environment.api + '/user';
	private http = inject(HttpClient);

	getUserData(password: string | null): Observable<User> {
		const params: Partial<{ password: string }> = {};
		if (password != null) {
			params.password = password;
		}
		return this.http.get<User>(this.url, { params });
	}
}