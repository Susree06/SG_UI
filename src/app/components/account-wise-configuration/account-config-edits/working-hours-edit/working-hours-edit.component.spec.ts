import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingHoursEditComponent } from './working-hours-edit.component';

describe('WorkingHoursEditComponent', () => {
  let component: WorkingHoursEditComponent;
  let fixture: ComponentFixture<WorkingHoursEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkingHoursEditComponent]
    });
    fixture = TestBed.createComponent(WorkingHoursEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
