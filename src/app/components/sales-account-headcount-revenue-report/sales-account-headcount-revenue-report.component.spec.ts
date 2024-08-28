import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesAccountHeadcountRevenueReportComponent } from './sales-account-headcount-revenue-report.component';

describe('SalesAccountHeadcountRevenueReportComponent', () => {
  let component: SalesAccountHeadcountRevenueReportComponent;
  let fixture: ComponentFixture<SalesAccountHeadcountRevenueReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalesAccountHeadcountRevenueReportComponent]
    });
    fixture = TestBed.createComponent(SalesAccountHeadcountRevenueReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
