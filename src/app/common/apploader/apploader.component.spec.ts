import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApploaderComponent } from './apploader.component';

describe('ApploaderComponent', () => {
  let component: ApploaderComponent;
  let fixture: ComponentFixture<ApploaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApploaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
