import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageBackboneComponent } from './page-backbone.component';

describe('PageBackboneComponent', () => {
    let component: PageBackboneComponent;
    let fixture: ComponentFixture<PageBackboneComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PageBackboneComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(PageBackboneComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
