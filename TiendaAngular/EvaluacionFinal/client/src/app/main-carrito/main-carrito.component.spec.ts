import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCarritoComponent } from './main-carrito.component';

describe('MainCarritoComponent', () => {
  let component: MainCarritoComponent;
  let fixture: ComponentFixture<MainCarritoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainCarritoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainCarritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
