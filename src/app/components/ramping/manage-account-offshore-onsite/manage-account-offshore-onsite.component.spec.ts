import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAccountOffshoreOnsiteComponent } from './manage-account-offshore-onsite.component';

describe('ManageAccountOffshoreOnsiteComponent', () => {
  let component: ManageAccountOffshoreOnsiteComponent;
  let fixture: ComponentFixture<ManageAccountOffshoreOnsiteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageAccountOffshoreOnsiteComponent]
    });
    fixture = TestBed.createComponent(ManageAccountOffshoreOnsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
