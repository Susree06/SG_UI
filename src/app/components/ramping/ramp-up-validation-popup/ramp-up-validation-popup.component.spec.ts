import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RampUpValidationPopupComponent } from './ramp-up-validation-popup.component';

describe('RampUpValidationPopupComponent', () => {
  let component: RampUpValidationPopupComponent;
  let fixture: ComponentFixture<RampUpValidationPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RampUpValidationPopupComponent]
    });
    fixture = TestBed.createComponent(RampUpValidationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
