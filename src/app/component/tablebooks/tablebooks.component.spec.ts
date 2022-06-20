import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablebooksComponent } from './tablebooks.component';

describe('TablebooksComponent', () => {
  let component: TablebooksComponent;
  let fixture: ComponentFixture<TablebooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablebooksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablebooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
