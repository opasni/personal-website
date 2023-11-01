import { AfterViewInit, Component, DestroyRef, ElementRef, QueryList, ViewChildren, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { User } from '@lib/classes/user.class';
import { Language } from '@lib/enums/language.enum';
import { StorageKeys } from '@lib/enums/storage-keys.enum';
import { LanguageService } from '@lib/services/language.service';
import { PrintService } from '@lib/services/print.service';
import { UserApiService } from '@lib/services/user.service';
import { catchError, of, tap } from 'rxjs';

@Component({
	template: ''
})
export abstract class ExportComponent implements AfterViewInit {
	@ViewChildren('sheet') sheetElements!: QueryList<ElementRef<HTMLBodyElement>>;

	public userData = new User();

	protected printService = inject(PrintService);
	private _destroyRef = inject(DestroyRef);
	private _userService = inject(UserApiService);
	private _languageService = inject(LanguageService);

	public lang = this._languageService.selectedLanguage$.getValue();

	ngAfterViewInit(): void {
		this.printService.sheetElements = this.sheetElements;
	}

	protected setUser() {
		let password = localStorage.getItem(StorageKeys.ACCESS_KEY);
		if (password == null || password === '') {
			const message = this.lang === Language.DE ? "Passwort einfügen" : this.lang === Language.SI ? "Vnesite geslo" : "Insert Password";
			password = prompt(message);
		}
		this._userService.getUserData(password)
			.pipe(
				tap(user => {
					if (user.email != null) {
						localStorage.setItem(StorageKeys.ACCESS_KEY, password ?? '');
					}
					this.userData = user;
				}),
				catchError(() => of(new User())),
				takeUntilDestroyed(this._destroyRef)
			)
			.subscribe();
	}
}