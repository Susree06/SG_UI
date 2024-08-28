import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlendedRateEditComponent } from './blended-rate-edit.component';

describe('BlendedRateEditComponent', () => {
  let component: BlendedRateEditComponent;
  let fixture: ComponentFixture<BlendedRateEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlendedRateEditComponent]
    });
    fixture = TestBed.createComponent(BlendedRateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
