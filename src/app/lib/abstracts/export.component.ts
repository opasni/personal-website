import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren, inject } from '@angular/core';
import { User } from '@lib/classes/user.class';
import { Language } from '@lib/enums/language.enum';
import { StorageKeys } from '@lib/enums/storage-keys.enum';
import { LanguageService } from '@lib/services/language.service';
import { PrintService } from '@lib/services/print.service';
import { UserApiService } from '@lib/services/user.service';
import { Observable, catchError, of, tap } from 'rxjs';

@Component({
	template: ''
})
export abstract class ExportComponent implements OnInit, AfterViewInit {
	@ViewChildren('sheet') sheetElements!: QueryList<ElementRef<HTMLBodyElement>>;

	public userData$ = new Observable<User>();
	public lang!: Language;

	protected printService = inject(PrintService);
	private userService = inject(UserApiService);
	private languageService = inject(LanguageService);

	ngOnInit(): void {
		this.lang = this.languageService.selectedLanguage$.getValue();
		this.setUser();
	}

	ngAfterViewInit(): void {
		this.printService.sheetElements = this.sheetElements;
	}

	private setUser() {
		let password = localStorage.getItem(StorageKeys.ACCESS_KEY);
		if (password == null || password === '') {
			const message = this.lang === Language.DE ? "Passwort einfügen" : this.lang === Language.SI ? "Vnesite geslo" : "Insert Password";
			password = prompt(message);
		}
		this.userData$ = this.userService.getUserData(password)
			.pipe(
				tap(user => {
					if (user.email != null) {
						localStorage.setItem(StorageKeys.ACCESS_KEY, password ?? '');
					}
				}),
				catchError(() => of(new User()))
			);
	}
}