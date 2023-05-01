import { CookieService } from 'ngx-cookie-service';

interface BaseCookieData {
    cookieVersion: string;
}

export abstract class BaseCookieService<T extends BaseCookieData> {
    protected readonly cookieName: string;
    protected readonly cookieVersion: string;

    constructor(cookieName: string, cookieVersion: string, protected cookieService: CookieService) {
        this.cookieName = cookieName;
        this.cookieVersion = cookieVersion;
    }

    /**
     * This method loads the values from the cookie and transform it into a generic shape. If there is no data available it will generate a default object of
     * the generic type.
     * @returns {T} saved cookie data or default object
     */
    loadCookieData(): T {
        let returnValue: T = this.getDefaultCookieData();

        if (this.cookieService.check(this.cookieName) === true) {
            const data: T = JSON.parse(this.cookieService.get(this.cookieName));

            if (data.cookieVersion !== this.cookieVersion) {
                this.clearCookieData();
            } else {
                returnValue = Object.assign(returnValue, data);
            }
        }

        return returnValue;
    }

    /**
     * This method saves the values into the cookie. If there is an existing item it will be replaced.
     * @param data
     */
    saveCookieData(data: T): void {
        this.clearCookieData();
        this.cookieService.set(this.cookieName, JSON.stringify(data), 7, '/', undefined, undefined, 'Strict');
    }

    /**
     * This method removes the cookie.
     */
    clearCookieData(): void {
        this.cookieService.delete(this.cookieName, '/');
    }

    /**
     * This method returns a default initialized object of a generic type.
     * @returns {T} default initialized object
     */
    protected abstract getDefaultCookieData(): T;
}
