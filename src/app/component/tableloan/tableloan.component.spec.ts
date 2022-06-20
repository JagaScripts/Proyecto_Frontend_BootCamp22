import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableloanComponent } from './tableloan.component';

describe('TableloanComponent', () => {
  let component: TableloanComponent;
  let fixture: ComponentFixture<TableloanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableloanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableloanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
