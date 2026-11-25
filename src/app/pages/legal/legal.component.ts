import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LEGAL_PROFILE } from '@lib/consts/legal-profile.const';

@Component({
    selector: 'app-legal',
    imports: [RouterLink, TranslatePipe],
    templateUrl: './legal.component.html',
    styleUrl: './legal.component.scss',
})
export class LegalComponent {
    readonly profile = LEGAL_PROFILE;
    readonly privacy = inject(ActivatedRoute).snapshot.data['privacy'] === true;
    readonly sections = ['hosting', 'contact', 'turnstile', 'storage', 'linkedin', 'transfers', 'retention', 'rights'];
}
