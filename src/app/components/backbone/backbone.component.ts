import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Theme } from 'src/app/modules/share/enums/theme.enum';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-backbone',
  templateUrl: './backbone.component.html',
  styleUrls: ['./backbone.component.scss']
})
export class BackboneComponent implements OnInit, AfterViewInit {

    public selectedTheme$: Observable<Theme> | undefined;

    constructor(private themeService: ThemeService) { }

    ngOnInit(): void {
        this.selectedTheme$ = this.themeService.selectedTheme.pipe(tap(d => console.log(d)));
    }

    ngAfterViewInit(): void {
        const loadingElement = document.getElementById('appSplashScreen');
        loadingElement?.remove();
    }

}
