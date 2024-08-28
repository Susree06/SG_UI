import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversionRatePopComponent } from './conversion-rate-pop.component';

describe('ConversionRatePopComponent', () => {
  let component: ConversionRatePopComponent;
  let fixture: ComponentFixture<ConversionRatePopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConversionRatePopComponent]
    });
    fixture = TestBed.createComponent(ConversionRatePopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
