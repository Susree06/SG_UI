import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedMonthlyAccountComponent } from './fixed-monthly-account.component';

describe('FixedMonthlyAccountComponent', () => {
  let component: FixedMonthlyAccountComponent;
  let fixture: ComponentFixture<FixedMonthlyAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FixedMonthlyAccountComponent]
    });
    fixture = TestBed.createComponent(FixedMonthlyAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
