import { animate, group, query, style, transition, trigger } from '@angular/animations';

const fromTopToBottom = group([
    query(':enter', [
        style({ transform: 'translateY(-100%)', opacity: '0' }),
        animate('.8s ease-out', style({ transform: 'translateY(0%)', opacity: '1' }))
    ], {
        optional: true,
    }),
    query(':leave', [
        style({ transform: 'translateY(0%)', opacity: '1' }),
        animate('.8s ease-out', style({ transform: 'translateY(100%)', opacity: '0' }))
    ], {
        optional: true,
    }),
]);

const fromBottomToTop = group([
    query(':enter', [
        style({ transform: 'translateY(100%)', opacity: '1' }),
        animate('.8s ease-out', style({ transform: 'translateY(0%)', opacity: '1' }))
    ], {
        optional: true,
    }),
    query(':leave', [
        style({ transform: 'translateY(0%)', opacity: '1' }),
        animate('.8s ease-out', style({ transform: 'translateY(-100%)', opacity: '0' }))
    ], {
        optional: true,
    }),
]);

const transitionStyle = query(':enter, :leave', style({
    position: 'absolute',
    top: '3rem',
    left: 'calc({{ menuWidth }}px + {{ paddingLeft }}rem)',
    width: 'calc(100vw - {{ menuWidth }}px - 2 * {{ paddingLeft }}rem)'
}));

const transitionParameters = {
    params: {
        menuWidth: 280,
        paddingLeft: 3
    }
};

export const ROUTE_ANIMATION = trigger('routeAnimations', [
    transition(':increment', [
        transitionStyle,
        fromBottomToTop,
    ], transitionParameters),
    transition(':decrement', [
        transitionStyle,
        fromTopToBottom,
    ], transitionParameters)
]);
