import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlLineComponent } from './control-line.component';

describe('ControlLineComponent', () => {
  let component: ControlLineComponent;
  let fixture: ComponentFixture<ControlLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlLineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
