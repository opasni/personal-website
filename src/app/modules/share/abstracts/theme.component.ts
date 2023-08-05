import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from 'src/app/services/theme.service';
import { Theme } from '../enums/theme.enum';

@Component({
  template: ''
})
export abstract class ThemeComponent implements OnInit {

  public selectedTheme$: Observable<Theme> | undefined;

  constructor(protected themeService: ThemeService) { }

  ngOnInit(): void {
      this.selectedTheme$ = this.themeService.selectedTheme;
  }

}