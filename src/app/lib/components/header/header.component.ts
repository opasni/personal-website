import { CommonModule } from '@angular/common';
import { Component, output, signal, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ProfileComponent } from '@lib/components/profile/profile.component';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [CommonModule, ProfileComponent, RouterModule, TranslatePipe],
})
export class HeaderComponent {
    public readonly sidebarExpandedChange = output<boolean>();

    public readonly isMenuOpen = signal(false);
    public readonly isSidebarExpanded = signal(false);

    toggleMenu(): void {
        this.isMenuOpen.update((isOpen) => !isOpen);
    }

    toggleSidebar(): void {
        this.isSidebarExpanded.update((isExpanded) => !isExpanded);
        this.sidebarExpandedChange.emit(this.isSidebarExpanded());
    }
}
