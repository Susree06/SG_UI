import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesAccountIGRevenueReportComponent } from './sales-account-ig-revenue-report.component';

describe('SalesAccountIGRevenueReportComponent', () => {
  let component: SalesAccountIGRevenueReportComponent;
  let fixture: ComponentFixture<SalesAccountIGRevenueReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalesAccountIGRevenueReportComponent]
    });
    fixture = TestBed.createComponent(SalesAccountIGRevenueReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
