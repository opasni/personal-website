import { Component, HostListener, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '@lib/services/language.service';
import { ThemeService } from '@lib/services/theme.service';
import { Language } from '@lib/enums/language.enum';
import { Theme } from '@lib/enums/theme.enum';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [RouterLink, TranslatePipe],
})
export class HeaderComponent {
    readonly language = inject(LanguageService);
    readonly theme = inject(ThemeService);
    readonly menuOpen = signal(false);
    readonly activeSection = signal('about');
    readonly sections = ['about', 'expertise', 'work', 'experience', 'personal', 'contact'];

    @HostListener('window:scroll')
    updateActiveSection(): void {
        const active = [...this.sections].reverse().find((id) => {
            const section = document.getElementById(id);
            return section && section.getBoundingClientRect().top <= 180;
        });
        this.activeSection.set(active ?? 'about');
    }

    @HostListener('document:keydown.escape')
    closeMenu(): void {
        this.menuOpen.set(false);
    }

    changeLanguage(event: Event): void {
        this.language.setSelectedLanguage((event.target as HTMLSelectElement).value as Language);
    }

    toggleTheme(): void {
        this.theme.setTheme(this.theme.selectedTheme() === Theme.Dark ? Theme.Light : Theme.Dark);
    }
}
