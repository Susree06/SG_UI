import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleAccessManagementComponent } from './role-access-management.component';

describe('RoleAccessManagementComponent', () => {
  let component: RoleAccessManagementComponent;
  let fixture: ComponentFixture<RoleAccessManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoleAccessManagementComponent]
    });
    fixture = TestBed.createComponent(RoleAccessManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
