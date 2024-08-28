import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByAnnuallyTabComponent } from './by-annually-tab.component';

describe('ByAnnuallyTabComponent', () => {
  let component: ByAnnuallyTabComponent;
  let fixture: ComponentFixture<ByAnnuallyTabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ByAnnuallyTabComponent]
    });
    fixture = TestBed.createComponent(ByAnnuallyTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
