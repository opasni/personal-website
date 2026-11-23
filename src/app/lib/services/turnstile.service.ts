import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';

export interface TurnstileOptions {
    sitekey: string;
    action: string;
    theme: 'light' | 'dark' | 'auto';
    size: 'flexible';
    'response-field': false;
    retry: 'never';
    callback: (token: string) => void;
    'error-callback': () => void;
    'expired-callback': () => void;
    'timeout-callback': () => void;
}

export interface TurnstileApi {
    render(container: HTMLElement, options: TurnstileOptions): string;
    remove(widgetId: string): void;
}

@Injectable({ providedIn: 'root' })
export class TurnstileService {
    private readonly _document = inject(DOCUMENT);
    private _loading?: Promise<TurnstileApi>;
    private _timeout?: number;

    load(): Promise<TurnstileApi> {
        const window = this._document.defaultView as (Window & { turnstile?: TurnstileApi }) | null;
        if (window?.turnstile) {
            return Promise.resolve(window.turnstile);
        }
        if (this._loading) {
            return this._loading;
        }

        this._loading = new Promise<TurnstileApi>((resolve, reject) => {
            const script = this._document.createElement('script');
            const finish = (api?: TurnstileApi): void => {
                clearTimeout(this._timeout);
                script.onload = script.onerror = null;
                if (api) {
                    resolve(api);
                } else {
                    script.remove();
                    reject(new Error('Turnstile could not be loaded.'));
                }
            };
            this._timeout = setTimeout(() => finish(), 15000);
            script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
            script.async = true;
            script.defer = true;
            script.onload = () => finish(window?.turnstile);
            script.onerror = () => finish();
            this._document.head.appendChild(script);
        }).catch((error: unknown) => {
            this._loading = undefined;
            throw error;
        });
        return this._loading;
    }
}
