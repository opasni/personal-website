import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingSpinnerComponent } from './loading-spinner.component';

describe('UserInfoComponent', () => {
    let component: LoadingSpinnerComponent;
    let fixture: ComponentFixture<LoadingSpinnerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LoadingSpinnerComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LoadingSpinnerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
