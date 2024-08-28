import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavesInPercentageEditComponent } from './leaves-in-percentage-edit.component';

describe('LeavesInPercentageEditComponent', () => {
  let component: LeavesInPercentageEditComponent;
  let fixture: ComponentFixture<LeavesInPercentageEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeavesInPercentageEditComponent]
    });
    fixture = TestBed.createComponent(LeavesInPercentageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
