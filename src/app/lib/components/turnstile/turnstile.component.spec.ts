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
        const remove = jasmine.createSpy('remove');
        const fixture = create(async () => ({
            render: (_, options) => {
                callbacks = options;
                return 'id';
            },
            remove,
        }));
        const resolved = jasmine.createSpy('resolved');
        fixture.componentInstance.resolved.subscribe(resolved);
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.destroy();
        callbacks.callback('late-token');
        expect(remove).toHaveBeenCalledOnceWith('id');
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
        const render = jasmine.createSpy('render');
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
        const failed = jasmine.createSpy('failed');
        fixture.componentInstance.failed.subscribe(failed);
        fixture.detectChanges();
        await fixture.whenStable();
        expect(failed).toHaveBeenCalledTimes(1);
    });
});
