import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawDataPopupComponent } from './raw-data-popup.component';

describe('RawDataPopupComponent', () => {
  let component: RawDataPopupComponent;
  let fixture: ComponentFixture<RawDataPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RawDataPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RawDataPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
