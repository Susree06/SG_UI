import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiAnnuallyFilterComponent } from './bi-annually-filter.component';

describe('BiAnnuallyFilterComponent', () => {
  let component: BiAnnuallyFilterComponent;
  let fixture: ComponentFixture<BiAnnuallyFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BiAnnuallyFilterComponent]
    });
    fixture = TestBed.createComponent(BiAnnuallyFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
