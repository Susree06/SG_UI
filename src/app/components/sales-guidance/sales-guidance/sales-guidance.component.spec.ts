import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesGuidanceComponent } from './sales-guidance.component';

describe('SalesGuidanceComponent', () => {
  let component: SalesGuidanceComponent;
  let fixture: ComponentFixture<SalesGuidanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalesGuidanceComponent]
    });
    fixture = TestBed.createComponent(SalesGuidanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
