import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversionRateHistoryPopUpComponent } from './conversion-rate-history-pop-up.component';

describe('ConversionRateHistoryPopUpComponent', () => {
  let component: ConversionRateHistoryPopUpComponent;
  let fixture: ComponentFixture<ConversionRateHistoryPopUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConversionRateHistoryPopUpComponent]
    });
    fixture = TestBed.createComponent(ConversionRateHistoryPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
