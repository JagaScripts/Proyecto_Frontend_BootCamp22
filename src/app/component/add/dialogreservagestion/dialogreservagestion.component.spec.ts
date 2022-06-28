import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogreservagestionComponent } from './dialogreservagestion.component';

describe('DialogreservagestionComponent', () => {
  let component: DialogreservagestionComponent;
  let fixture: ComponentFixture<DialogreservagestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogreservagestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogreservagestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
