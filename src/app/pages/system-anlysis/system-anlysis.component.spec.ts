import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemAnlysisComponent } from './system-anlysis.component';

describe('SystemAnlysisComponent', () => {
  let component: SystemAnlysisComponent;
  let fixture: ComponentFixture<SystemAnlysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemAnlysisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemAnlysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
