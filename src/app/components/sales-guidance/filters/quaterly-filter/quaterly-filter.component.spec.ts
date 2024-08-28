import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuaterlyFilterComponent } from './quaterly-filter.component';

describe('QuaterlyFilterComponent', () => {
  let component: QuaterlyFilterComponent;
  let fixture: ComponentFixture<QuaterlyFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuaterlyFilterComponent]
    });
    fixture = TestBed.createComponent(QuaterlyFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
