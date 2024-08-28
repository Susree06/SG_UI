import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserConfigDetailsComponent } from './user-config-details.component';

describe('UserConfigDetailsComponent', () => {
  let component: UserConfigDetailsComponent;
  let fixture: ComponentFixture<UserConfigDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserConfigDetailsComponent]
    });
    fixture = TestBed.createComponent(UserConfigDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
