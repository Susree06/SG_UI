import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavesInPercentageComponent } from './leaves-in-percentage.component';

describe('LeavesInPercentageComponent', () => {
  let component: LeavesInPercentageComponent;
  let fixture: ComponentFixture<LeavesInPercentageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeavesInPercentageComponent]
    });
    fixture = TestBed.createComponent(LeavesInPercentageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
