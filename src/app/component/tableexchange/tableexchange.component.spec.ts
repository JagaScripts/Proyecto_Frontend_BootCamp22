import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableexchangeComponent } from './tableexchange.component';

describe('TableexchangeComponent', () => {
  let component: TableexchangeComponent;
  let fixture: ComponentFixture<TableexchangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableexchangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableexchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
