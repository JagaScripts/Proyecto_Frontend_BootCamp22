import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogintercambiarsolicitudComponent } from './dialogintercambiarsolicitud.component';

describe('DialogintercambiarsolicitudComponent', () => {
  let component: DialogintercambiarsolicitudComponent;
  let fixture: ComponentFixture<DialogintercambiarsolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogintercambiarsolicitudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogintercambiarsolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
