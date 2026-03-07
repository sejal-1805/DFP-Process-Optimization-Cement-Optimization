import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxDatetimeComponent } from './ngx-datetime.component';

describe('NgxDatetimeComponent', () => {
  let component: NgxDatetimeComponent;
  let fixture: ComponentFixture<NgxDatetimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxDatetimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxDatetimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
