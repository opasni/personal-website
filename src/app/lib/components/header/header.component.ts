import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ProfileComponent } from '@lib/components/profile/profile.component';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    imports: [CommonModule, ProfileComponent, RouterModule, TranslateModule],
})
export class HeaderComponent {
    @Output() public sidebarExpandedChange = new EventEmitter<boolean>();

    public isMenuOpen = false;
    public isSidebarExpanded = false;

    toggleMenu(): void {
        this.isMenuOpen = !this.isMenuOpen;
    }

    toggleSidebar(): void {
        this.isSidebarExpanded = !this.isSidebarExpanded;
        this.sidebarExpandedChange.emit(this.isSidebarExpanded);
    }
}
