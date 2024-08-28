import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuaterlySalesTabComponent } from './quaterly-sales-tab.component';

describe('QuaterlySalesTabComponent', () => {
  let component: QuaterlySalesTabComponent;
  let fixture: ComponentFixture<QuaterlySalesTabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuaterlySalesTabComponent]
    });
    fixture = TestBed.createComponent(QuaterlySalesTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
