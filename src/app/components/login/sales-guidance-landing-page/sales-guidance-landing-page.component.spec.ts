import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesGuidanceLandingPageComponent } from './sales-guidance-landing-page.component';

describe('SalesGuidanceLandingPageComponent', () => {
  let component: SalesGuidanceLandingPageComponent;
  let fixture: ComponentFixture<SalesGuidanceLandingPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalesGuidanceLandingPageComponent]
    });
    fixture = TestBed.createComponent(SalesGuidanceLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
