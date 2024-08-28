import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleAccessManagementPopupComponent } from './role-access-management-popup.component';

describe('RoleAccessManagementPopupComponent', () => {
  let component: RoleAccessManagementPopupComponent;
  let fixture: ComponentFixture<RoleAccessManagementPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoleAccessManagementPopupComponent]
    });
    fixture = TestBed.createComponent(RoleAccessManagementPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
