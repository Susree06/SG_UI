import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlendedRateComponent } from './blended-rate.component';

describe('BlendedRateComponent', () => {
  let component: BlendedRateComponent;
  let fixture: ComponentFixture<BlendedRateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlendedRateComponent]
    });
    fixture = TestBed.createComponent(BlendedRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
