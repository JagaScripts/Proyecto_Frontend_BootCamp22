import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarhomeComponent } from './sidebarhome.component';

describe('SidebarhomeComponent', () => {
  let component: SidebarhomeComponent;
  let fixture: ComponentFixture<SidebarhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarhomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
