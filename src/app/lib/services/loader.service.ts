import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class LoaderService {
	private _loading: boolean = false;
	setLoading(loading: boolean): void {
		this._loading = loading;
	}
	getLoading(): boolean {
		return this._loading;
	}
}
