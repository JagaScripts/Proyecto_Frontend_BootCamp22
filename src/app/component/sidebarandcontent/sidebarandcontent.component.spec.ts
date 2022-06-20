import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarandcontentComponent } from './sidebarandcontent.component';

describe('SidebarandcontentComponent', () => {
  let component: SidebarandcontentComponent;
  let fixture: ComponentFixture<SidebarandcontentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarandcontentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarandcontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
