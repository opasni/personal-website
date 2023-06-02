import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillMeasureComponent } from './skill-measure.component';

describe('SkillMeasureComponent', () => {
  let component: SkillMeasureComponent;
  let fixture: ComponentFixture<SkillMeasureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillMeasureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillMeasureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
