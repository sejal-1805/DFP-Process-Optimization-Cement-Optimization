import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlGaugeComponent } from './control-gauge.component';

describe('ControlGaugeComponent', () => {
  let component: ControlGaugeComponent;
  let fixture: ComponentFixture<ControlGaugeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlGaugeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlGaugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
