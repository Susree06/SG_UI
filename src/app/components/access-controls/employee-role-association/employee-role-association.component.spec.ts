import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeRoleAssociationComponent } from './employee-role-association.component';

describe('EmployeeRoleAssociationComponent', () => {
  let component: EmployeeRoleAssociationComponent;
  let fixture: ComponentFixture<EmployeeRoleAssociationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeRoleAssociationComponent]
    });
    fixture = TestBed.createComponent(EmployeeRoleAssociationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});