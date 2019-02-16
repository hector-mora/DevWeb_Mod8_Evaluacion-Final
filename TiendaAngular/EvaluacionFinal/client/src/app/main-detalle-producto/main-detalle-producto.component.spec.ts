import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDetalleProductoComponent } from './main-detalle-producto.component';

describe('MainDetalleProductoComponent', () => {
  let component: MainDetalleProductoComponent;
  let fixture: ComponentFixture<MainDetalleProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainDetalleProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainDetalleProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
