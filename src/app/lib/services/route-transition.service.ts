import { DestroyRef, Injectable, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
    ActivatedRouteSnapshot,
    NavigationCancel,
    NavigationEnd,
    NavigationError,
    Router,
    RoutesRecognized,
} from '@angular/router';
import { filter } from 'rxjs';

type RouteDirection = 'forward' | 'backward' | 'none';

@Injectable({ providedIn: 'root' })
export class RouteTransitionService {
    private readonly _router = inject(Router);
    private readonly _destroyRef = inject(DestroyRef);
    private readonly _direction = signal<RouteDirection>('none');

    private _currentIndex = this._getAnimationIndex(this._router.routerState.snapshot.root);
    private _pendingIndex: number | null = null;

    readonly enterClass = computed(() => {
        if (this._direction() === 'forward') {
            return 'route-enter-forward';
        }
        if (this._direction() === 'backward') {
            return 'route-enter-backward';
        }
        return '';
    });

    readonly leaveClass = computed(() => {
        if (this._direction() === 'forward') {
            return 'route-leave-forward';
        }
        if (this._direction() === 'backward') {
            return 'route-leave-backward';
        }
        return '';
    });

    constructor() {
        this._router.events
            .pipe(
                filter(
                    (event) =>
                        event instanceof RoutesRecognized ||
                        event instanceof NavigationEnd ||
                        event instanceof NavigationCancel ||
                        event instanceof NavigationError,
                ),
                takeUntilDestroyed(this._destroyRef),
            )
            .subscribe((event) => {
                if (event instanceof RoutesRecognized) {
                    this._prepareTransition(event.state.root);
                    return;
                }

                if (event instanceof NavigationEnd && this._pendingIndex != null) {
                    this._currentIndex = this._pendingIndex;
                }
                this._pendingIndex = null;
            });
    }

    private _prepareTransition(targetRoot: ActivatedRouteSnapshot): void {
        const targetIndex = this._getAnimationIndex(targetRoot);
        if (targetIndex == null) {
            this._direction.set('none');
            return;
        }

        if (this._currentIndex == null) {
            this._currentIndex = this._getAnimationIndex(this._router.routerState.snapshot.root);
        }

        if (this._currentIndex == null || targetIndex === this._currentIndex) {
            this._direction.set('none');
        } else {
            this._direction.set(targetIndex > this._currentIndex ? 'forward' : 'backward');
        }
        this._pendingIndex = targetIndex;
    }

    private _getAnimationIndex(route: ActivatedRouteSnapshot): number | null {
        let current: ActivatedRouteSnapshot | null = route;
        let animationIndex: number | null = null;

        while (current != null) {
            const value = current.data['animation'];
            if (typeof value === 'number') {
                animationIndex = value;
            }
            current = current.firstChild;
        }

        return animationIndex;
    }
}
