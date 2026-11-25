import { beforeEach, describe, expect, it } from 'vitest';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import translations from '../../../../assets/i18n/en.json';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { SkillsService } from '@lib/services/skills.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageBackboneComponent } from './page-backbone.component';

describe('PageBackboneComponent', () => {
    let component: PageBackboneComponent;
    let fixture: ComponentFixture<PageBackboneComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [
                provideRouter([]),
                provideHttpClient(),
                provideHttpClientTesting(),
                provideTranslateService(),
                SkillsService,
            ],
            imports: [PageBackboneComponent],
        }).compileComponents();

        TestBed.inject(TranslateService).setTranslation('en', translations);
        TestBed.inject(TranslateService).use('en');
        fixture = TestBed.createComponent(PageBackboneComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
