import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageKeys } from '@lib/enums/storage-keys.enum';
import { EncryptionService } from '@lib/services/encryption.service';

const cloneRequest = (request: HttpRequest<unknown>, encrypt: EncryptionService): HttpRequest<unknown> => {
    const clonedRequest = request.clone({
        setHeaders: {
            Authorization: `Basic ${localStorage.getItem(encrypt.decrypt(StorageKeys.ACCESS_KEY))}`,
        },
    });
    return clonedRequest;
};

export const credentialsInterceptor: HttpInterceptorFn = (
    request: HttpRequest<unknown>,
    next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
    const encrypt = inject(EncryptionService);
    return next(cloneRequest(request, encrypt));
};
