import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableinfoComponent } from './tableinfo.component';

describe('TableinfoComponent', () => {
  let component: TableinfoComponent;
  let fixture: ComponentFixture<TableinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
