import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportBackboneComponent } from './export-backbone.component';

describe('ExportBackboneComponent', () => {
    let component: ExportBackboneComponent;
    let fixture: ComponentFixture<ExportBackboneComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ExportBackboneComponent],
        });
        fixture = TestBed.createComponent(ExportBackboneComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
