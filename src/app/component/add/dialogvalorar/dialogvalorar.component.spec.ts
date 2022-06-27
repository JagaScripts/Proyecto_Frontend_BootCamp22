import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogvalorarComponent } from './dialogvalorar.component';

describe('DialogvalorarComponent', () => {
  let component: DialogvalorarComponent;
  let fixture: ComponentFixture<DialogvalorarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogvalorarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogvalorarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
