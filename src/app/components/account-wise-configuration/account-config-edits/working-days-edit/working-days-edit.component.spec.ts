import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingDaysEditComponent } from './working-days-edit.component';

describe('WorkingDaysEditComponent', () => {
  let component: WorkingDaysEditComponent;
  let fixture: ComponentFixture<WorkingDaysEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkingDaysEditComponent]
    });
    fixture = TestBed.createComponent(WorkingDaysEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
