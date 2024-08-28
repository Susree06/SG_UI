import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesProjectRevenueReportComponent } from './sales-project-revenue-report.component';

describe('SalesProjectRevenueReportComponent', () => {
  let component: SalesProjectRevenueReportComponent;
  let fixture: ComponentFixture<SalesProjectRevenueReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalesProjectRevenueReportComponent]
    });
    fixture = TestBed.createComponent(SalesProjectRevenueReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
