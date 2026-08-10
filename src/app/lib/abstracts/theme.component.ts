import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from '@lib/services/theme.service';
import { Theme } from '@lib/enums/theme.enum';
import { RouteTransitionService } from '@lib/services/route-transition.service';

@Component({
    template: '',
})
export abstract class ThemeComponent {
    protected themeService = inject(ThemeService);
    public readonly routeTransition = inject(RouteTransitionService);
    public selectedTheme$: Observable<Theme> | undefined = this.themeService.selectedTheme;
}
