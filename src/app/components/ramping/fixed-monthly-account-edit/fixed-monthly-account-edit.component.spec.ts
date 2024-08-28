import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedMonthlyAccountEditComponent } from './fixed-monthly-account-edit.component';

describe('FixedMonthlyAccountEditComponent', () => {
  let component: FixedMonthlyAccountEditComponent;
  let fixture: ComponentFixture<FixedMonthlyAccountEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FixedMonthlyAccountEditComponent]
    });
    fixture = TestBed.createComponent(FixedMonthlyAccountEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
