import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesReportFilterComponent } from './sales-report-filter.component';

describe('SalesReportFilterComponent', () => {
  let component: SalesReportFilterComponent;
  let fixture: ComponentFixture<SalesReportFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalesReportFilterComponent]
    });
    fixture = TestBed.createComponent(SalesReportFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
