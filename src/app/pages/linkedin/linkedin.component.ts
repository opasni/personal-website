import { CommonModule } from '@angular/common';
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TranslatePipe } from '@ngx-translate/core';

import { ThemeComponent } from '@lib/abstracts/theme.component';

import { LINKEDIN_POSTS } from './linkedin-posts.const';

@Component({
    selector: 'app-linkedin',
    templateUrl: './linkedin.component.html',
    styleUrls: ['./linkedin.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [CommonModule, TranslatePipe],
})
export class LinkedinComponent extends ThemeComponent {
    private _sanitizer = inject(DomSanitizer);

    public posts: SafeResourceUrl[] = LINKEDIN_POSTS.map((post) =>
        this._sanitizer.bypassSecurityTrustResourceUrl(post),
    );
}
