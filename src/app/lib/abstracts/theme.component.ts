import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from '@lib/services/theme.service';
import { Theme } from '@lib/enums/theme.enum';

@Component({
    template: '',
    standalone: false
})
export abstract class ThemeComponent {
  protected themeService = inject(ThemeService);
  public selectedTheme$: Observable<Theme> | undefined = this.themeService.selectedTheme;
}