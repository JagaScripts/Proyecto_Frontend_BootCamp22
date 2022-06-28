import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogreservasolicitudComponent } from './dialogreservasolicitud.component';

describe('DialogreservasolicitudComponent', () => {
  let component: DialogreservasolicitudComponent;
  let fixture: ComponentFixture<DialogreservasolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogreservasolicitudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogreservasolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
