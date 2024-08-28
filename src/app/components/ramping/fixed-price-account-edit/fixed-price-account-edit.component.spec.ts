import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedPriceAccountEditComponent } from './fixed-price-account-edit.component';

describe('FixedPriceAccountEditComponent', () => {
  let component: FixedPriceAccountEditComponent;
  let fixture: ComponentFixture<FixedPriceAccountEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FixedPriceAccountEditComponent]
    });
    fixture = TestBed.createComponent(FixedPriceAccountEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
