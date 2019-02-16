import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/Rx';
import { Observable } from 'rxjs';

@Injectable()
export class HttpService {
  private producto: any={};
  private carrito: any[] = [];

  constructor(private http : Http) { }

  //utilizado para definir producto a detallar
  detalleProducto(detProducto){
    this.producto = detProducto;
  };

  //utilizado para definir producto a detallar
  obtenerProducto(){
    return this.producto;
  };

  //utilizado para obtener datos del usuario del login
  getDatosUsuarios(usuario){
    return this.http.post('usuarios/', usuario)
    .map(data => data.json()).toPromise();
  }

  //utilizado para obtener datos del usuario
  logoutUsuario(){
    return this.http.post('usuarios/logout',{})
    .map(data => data.json()).toPromise();
  }

  //utilizado para obtener datos de los productos en BD
  getTodosProductos(){
    return this.http.get('articulos/all')
    .map(data => data.json()).toPromise();
  };

  //utilizado para agregar los productos al carrito
  agregarCarro(cantComprar){
    return this.http.post('carrito/new', {producto: this.producto, cantidad: cantComprar})
    .map(data => data.json()).toPromise();
  };

  actualizaArticulosBD(producto){
    return this.http.post('articulos/update', producto)
    .map(data => data.json()).toPromise();
  }

  eliminaCarritoBD(producto){
    return this.http.post('carrito/delete', producto)
    .map(data => data.json()).toPromise();
  }

  //utilizado para retornar el carrito
  actualizarCarrito(){
    return this.http.get('carrito/all')
    .map(data => data.json()).toPromise();
  }
}
