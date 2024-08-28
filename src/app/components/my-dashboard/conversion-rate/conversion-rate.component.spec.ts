import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversionRateComponent } from './conversion-rate.component';

describe('ConversionRateComponent', () => {
  let component: ConversionRateComponent;
  let fixture: ComponentFixture<ConversionRateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConversionRateComponent]
    });
    fixture = TestBed.createComponent(ConversionRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
