import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { StorageKeys } from '@lib/enums/storage-keys.enum';
import { Observable } from 'rxjs';

const cloneRequest = (request: HttpRequest<unknown>): HttpRequest<unknown> => {
    const clonedRequest = request.clone({
        setHeaders: {
            Authorization: `Basic ${localStorage.getItem(StorageKeys.ACCESS_KEY)}`,
        },
    });
    return clonedRequest;
};

export const credentialsInterceptor: HttpInterceptorFn = (
    request: HttpRequest<unknown>,
    next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
    return next(cloneRequest(request));
};
