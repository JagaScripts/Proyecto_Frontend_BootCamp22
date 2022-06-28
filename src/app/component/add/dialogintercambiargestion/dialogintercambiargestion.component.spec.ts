import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogintercambiargestionComponent } from './dialogintercambiargestion.component';

describe('DialogintercambiargestionComponent', () => {
  let component: DialogintercambiargestionComponent;
  let fixture: ComponentFixture<DialogintercambiargestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogintercambiargestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogintercambiargestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
