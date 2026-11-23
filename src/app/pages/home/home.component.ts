import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ContactComponent } from '@pages/contact/contact/contact.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [RouterLink, TranslatePipe, ContactComponent],
})
export class HomeComponent {
    readonly capabilities = [
        { id: 'architecture', icon: 'bi-diagram-3', tags: ['AWS / Azure', 'Microservices', 'APIs', 'Docker', 'CI/CD'] },
        {
            id: 'engineering',
            icon: 'bi-code-slash',
            tags: ['TypeScript', 'Angular / React', 'C# / .NET', 'Python', 'SQL'],
        },
        { id: 'data', icon: 'bi-braces', tags: ['AI / NLP', 'MCP', 'Celonis', 'ETL', 'FastAPI'] },
        { id: 'leadership', icon: 'bi-people', tags: [] },
    ];
    readonly projects = [
        { id: 'job-car', name: 'JobCar', client: 'Graf Hardenberg', tags: ['Angular', 'Node.js', 'AWS', 'PostgreSQL'] },
        {
            id: 'squadcheck',
            name: 'Squadcheck',
            client: '8020 Consulting',
            tags: ['.NET', 'Angular', 'MCP', 'Copilot'],
        },
        {
            id: 'audi-frequency',
            name: 'Frequency Analysis',
            client: 'Audi',
            tags: ['React Native', 'TypeScript', 'FFT'],
        },
        { id: 'vw-ai', name: 'AI Logistics Tools', client: 'Volkswagen', tags: ['Python', 'FastAPI', 'AI / NLP'] },
        { id: 'scania', name: 'Order-to-Delivery', client: 'Scania', tags: ['Celonis', 'PQL', 'ETL'] },
        {
            id: 'dak',
            name: 'Commerce & Operations',
            client: 'DAK Coffee Roasters',
            tags: ['E-commerce', 'APIs', 'AWS'],
        },
    ];
    readonly roles = [
        { id: '8020', start: '09/2024', end: '', company: '8020 Consulting GmbH' },
        { id: 'achtzig20si', start: '01/2023', end: '', company: 'Achtzig20 d.o.o.' },
        { id: 'achtzig20', start: '11/2018', end: '09/2024', company: 'Achtzig20 GmbH' },
    ];
    readonly languages = ['slovenian', 'english', 'german', 'italian'];
}
