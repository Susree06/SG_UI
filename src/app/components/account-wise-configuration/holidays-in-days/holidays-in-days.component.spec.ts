import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidaysInDaysComponent } from './holidays-in-days.component';

describe('HolidaysInDaysComponent', () => {
  let component: HolidaysInDaysComponent;
  let fixture: ComponentFixture<HolidaysInDaysComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HolidaysInDaysComponent]
    });
    fixture = TestBed.createComponent(HolidaysInDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
