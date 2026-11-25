import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild, inject, output } from '@angular/core';
import { TurnstileApi, TurnstileService } from '@lib/services/turnstile.service';

@Component({
    selector: 'app-turnstile',
    template: '<div #container></div>',
    styles: [':host { display: block; width: 100%; max-width: 400px; margin-block: 1rem; }'],
})
export class TurnstileComponent implements AfterViewInit, OnDestroy {
    @Input({ required: true }) siteKey = '';
    @Input() theme: 'light' | 'dark' | 'auto' = 'auto';
    @ViewChild('container', { static: true }) container!: ElementRef<HTMLElement>;
    readonly resolved = output<string>();
    readonly failed = output<void>();
    private readonly _loader = inject(TurnstileService);
    private _api?: TurnstileApi;
    private _widgetId?: string;
    private _destroyed = false;

    async ngAfterViewInit(): Promise<void> {
        if (!this.siteKey) {
            this.failed.emit();
            return;
        }
        try {
            this._api = await this._loader.load();
            if (this._destroyed) {
                return;
            }
            const fail = (): void => {
                if (!this._destroyed) {
                    this.failed.emit();
                }
            };
            this._widgetId = this._api.render(this.container.nativeElement, {
                sitekey: this.siteKey,
                action: 'contact',
                theme: this.theme,
                size: 'flexible',
                'response-field': false,
                retry: 'never',
                callback: (token) => {
                    if (!this._destroyed) {
                        this.resolved.emit(token);
                    }
                },
                'error-callback': fail,
                'expired-callback': fail,
                'timeout-callback': fail,
            });
        } catch {
            if (!this._destroyed) {
                this.failed.emit();
            }
        }
    }

    ngOnDestroy(): void {
        this._destroyed = true;
        if (this._widgetId !== undefined) {
            this._api?.remove(this._widgetId);
        }
    }
}
