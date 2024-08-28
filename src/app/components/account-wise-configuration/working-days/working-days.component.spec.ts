import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingDaysComponent } from './working-days.component';

describe('WorkingDaysComponent', () => {
  let component: WorkingDaysComponent;
  let fixture: ComponentFixture<WorkingDaysComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkingDaysComponent]
    });
    fixture = TestBed.createComponent(WorkingDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
