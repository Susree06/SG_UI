import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkFlowTableComponent } from './work-flow-table.component';

describe('WorkFlowTableComponent', () => {
  let component: WorkFlowTableComponent;
  let fixture: ComponentFixture<WorkFlowTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkFlowTableComponent]
    });
    fixture = TestBed.createComponent(WorkFlowTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
