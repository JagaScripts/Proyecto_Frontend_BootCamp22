import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogbookComponent } from './dialogbook.component';

describe('DialogbookComponent', () => {
  let component: DialogbookComponent;
  let fixture: ComponentFixture<DialogbookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogbookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
