import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedPriceAccountComponent } from './fixed-price-account.component';

describe('FixedPriceAccountComponent', () => {
  let component: FixedPriceAccountComponent;
  let fixture: ComponentFixture<FixedPriceAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FixedPriceAccountComponent]
    });
    fixture = TestBed.createComponent(FixedPriceAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
