import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablevalueComponent } from './tablevalue.component';

describe('TablevalueComponent', () => {
  let component: TablevalueComponent;
  let fixture: ComponentFixture<TablevalueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablevalueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablevalueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
