import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportFilesComponent } from './report-files.component';

describe('ReportFilesComponent', () => {
  let component: ReportFilesComponent;
  let fixture: ComponentFixture<ReportFilesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportFilesComponent]
    });
    fixture = TestBed.createComponent(ReportFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
