import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlySalesTabComponent } from './monthly-sales-tab.component';

describe('MonthlySalesTabComponent', () => {
  let component: MonthlySalesTabComponent;
  let fixture: ComponentFixture<MonthlySalesTabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonthlySalesTabComponent]
    });
    fixture = TestBed.createComponent(MonthlySalesTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
