import { describe, expect, it, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { TurnstileComponent } from './turnstile.component';
import { TurnstileApi, TurnstileOptions, TurnstileService } from '@lib/services/turnstile.service';

describe('Turnstile widget lifecycle', () => {
    const create = (load: () => Promise<TurnstileApi>) => {
        TestBed.configureTestingModule({ providers: [{ provide: TurnstileService, useValue: { load } }] });
        const fixture = TestBed.createComponent(TurnstileComponent);
        fixture.componentRef.setInput('siteKey', 'public-key');
        return fixture;
    };

    it('removes the widget on destruction and ignores late callbacks', async () => {
        let callbacks!: TurnstileOptions;
        const remove = vi.fn();
        const fixture = create(async () => ({
            render: (_, options) => {
                callbacks = options;
                return 'id';
            },
            remove,
        }));
        const resolved = vi.fn();
        fixture.componentInstance.resolved.subscribe(resolved);
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.destroy();
        callbacks.callback('late-token');
        expect(remove).toHaveBeenCalledExactlyOnceWith('id');
        expect(resolved).not.toHaveBeenCalled();
    });

    it('does not render if navigation happens while the script is loading', async () => {
        let loaded!: (api: TurnstileApi) => void;
        const fixture = create(
            () =>
                new Promise((resolve) => {
                    loaded = resolve;
                }),
        );
        const render = vi.fn();
        const initializing = fixture.componentInstance.ngAfterViewInit();
        fixture.destroy();
        loaded({ render, remove: () => {} });
        await initializing;
        expect(render).not.toHaveBeenCalled();
    });

    it('reports blocked or failed script loading', async () => {
        const fixture = create(async () => {
            throw new Error('blocked');
        });
        const failed = vi.fn();
        fixture.componentInstance.failed.subscribe(failed);
        fixture.detectChanges();
        await fixture.whenStable();
        expect(failed).toHaveBeenCalledTimes(1);
    });
});
