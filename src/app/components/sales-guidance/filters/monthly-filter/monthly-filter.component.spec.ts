import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyFilterComponent } from './monthly-filter.component';

describe('MonthlyFilterComponent', () => {
  let component: MonthlyFilterComponent;
  let fixture: ComponentFixture<MonthlyFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonthlyFilterComponent]
    });
    fixture = TestBed.createComponent(MonthlyFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
