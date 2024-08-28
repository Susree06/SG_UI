import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeRoleAssociationPopupComponent } from './employee-role-association-popup.component';

describe('EmployeeRoleAssociationPopupComponent', () => {
  let component: EmployeeRoleAssociationPopupComponent;
  let fixture: ComponentFixture<EmployeeRoleAssociationPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeRoleAssociationPopupComponent]
    });
    fixture = TestBed.createComponent(EmployeeRoleAssociationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});