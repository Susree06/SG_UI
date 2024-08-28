import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidaysInDaysEditComponent } from './holidays-in-days-edit.component';

describe('HolidaysInDaysEditComponent', () => {
  let component: HolidaysInDaysEditComponent;
  let fixture: ComponentFixture<HolidaysInDaysEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HolidaysInDaysEditComponent]
    });
    fixture = TestBed.createComponent(HolidaysInDaysEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
