import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayListTableComponent } from './holiday-list-table.component';

describe('HolidayListTableComponent', () => {
  let component: HolidayListTableComponent;
  let fixture: ComponentFixture<HolidayListTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HolidayListTableComponent]
    });
    fixture = TestBed.createComponent(HolidayListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
