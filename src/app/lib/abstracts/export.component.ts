import { AfterViewInit, Component, DestroyRef, ElementRef, QueryList, ViewChildren, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, of, tap } from 'rxjs';
import { User } from '@lib/classes/user.class';
import { StorageKeys } from '@lib/enums/storage-keys.enum';
import { PrintService } from '@lib/services/print.service';
import { UserApiService } from '@lib/services/user.service';
import { TranslateService } from '@ngx-translate/core';
import { EncryptionService } from '@lib/services/encryption.service';
import { LanguageService } from '@lib/services/language.service';

@Component({
    template: '',
})
export abstract class ExportComponent implements AfterViewInit {
    @ViewChildren('sheet') sheetElements!: QueryList<ElementRef<HTMLBodyElement>>;

    public userData = new User();

    protected printService = inject(PrintService);
    private _destroyRef = inject(DestroyRef);
    private _encrypt = inject(EncryptionService);
    private _userService = inject(UserApiService);
    private _translateService = inject(TranslateService);

    public language$ = inject(LanguageService).selectedLanguage$;

    ngAfterViewInit(): void {
        this.printService.sheetElements = this.sheetElements;
    }

    protected async setUser(): Promise<void> {
        const storedEncryptedPassword = localStorage.getItem(StorageKeys.ACCESS_KEY);
        let password = null;
        if (storedEncryptedPassword == null || storedEncryptedPassword === '') {
            const message = this._translateService.instant('insert-password');
            password = await this._encrypt.encrypt(prompt(message) ?? '');
        }

        this._userService
            .getUserData(password)
            .pipe(
                tap((user) => {
                    if (user.email != null && password != null) {
                        localStorage.setItem(StorageKeys.ACCESS_KEY, password);
                    }
                    this.userData = user;
                }),
                catchError(() => of(new User())),
                takeUntilDestroyed(this._destroyRef),
            )
            .subscribe();
    }
}
