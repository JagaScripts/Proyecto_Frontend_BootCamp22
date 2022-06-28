import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalfilaborradaComponent } from './modalfilaborrada.component';

describe('ModalfilaborradaComponent', () => {
  let component: ModalfilaborradaComponent;
  let fixture: ComponentFixture<ModalfilaborradaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalfilaborradaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalfilaborradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
