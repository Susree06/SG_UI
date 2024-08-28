import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DyanamicRevenueComponent } from './dyanamic-revenue.component';

describe('DyanamicRevenueComponent', () => {
  let component: DyanamicRevenueComponent;
  let fixture: ComponentFixture<DyanamicRevenueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DyanamicRevenueComponent]
    });
    fixture = TestBed.createComponent(DyanamicRevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
