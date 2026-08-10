import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { ThemeService } from '@lib/services/theme.service';
import { RouteTransitionService } from '@lib/services/route-transition.service';

@Component({
    changeDetection: ChangeDetectionStrategy.Eager,
    template: '',
})
export abstract class ThemeComponent {
    protected themeService = inject(ThemeService);
    public readonly routeTransition = inject(RouteTransitionService);
    public readonly selectedTheme = this.themeService.selectedTheme;
}
