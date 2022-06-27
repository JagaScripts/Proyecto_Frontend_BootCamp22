import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastbookComponent } from './toastbook.component';

describe('ToastbookComponent', () => {
  let component: ToastbookComponent;
  let fixture: ComponentFixture<ToastbookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToastbookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToastbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
