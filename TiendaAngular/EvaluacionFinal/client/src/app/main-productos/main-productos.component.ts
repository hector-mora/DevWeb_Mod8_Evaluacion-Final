import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { Response } from '@angular/http';


@Component({
  selector: 'app-main-productos',
  templateUrl: './main-productos.component.html',
  styleUrls: ['./main-productos.component.css']
})
export class MainProductosComponent implements OnInit {
  articulos: any[] = [];
  filtroProducto: any = {producto: ''};
	cantComprar;
  carrito: any[] = [];
  mensaje: string;

  constructor(private router: Router, private httpService : HttpService) { }

  ngOnInit() {
    this.mensaje = "Cargando Productos... por favor espere..."
    //actualizo carrito de compras del Menu al iniciar
    this.actualizaMenu();

    //cargo los articulos al iniciar
    this.httpService.getTodosProductos()
      .then(data => {
        if(data.respuesta == "OK"){
          this.articulos = data.articulos;
          this.mensaje = "No existen productos para la busqueda...";
        }else{
          alert(data.respuesta);
        }
      })
      .catch(error => console.log(error));
  }

  //Redireccionamiento al ver mas informacion de un articulo
  MasInfo(detProducto) {
    this.httpService.detalleProducto(detProducto);
    this.router.navigate(['/main/main-detalle']);
  }

  //al agregar productos al carrito de compras
  agragarProductos(detProducto) {
    if(!isNaN(this.cantComprar)) {
      this.httpService.detalleProducto(detProducto);
      this.httpService.agregarCarro(this.cantComprar)
        .then(data => {
          if(data.respuesta != "OK"){
            alert(data.respuesta);
          }else{
            //actualizo carrito de compras del Menu al agregar articulos
            this.actualizaMenu();
          }
        })
        .catch(error => console.log(error));
    }
  }

  //actualizo la arreglo del carrito de compras
  actualizaMenu(){
    this.httpService.actualizarCarrito()
      .then(data => {
        if(data.respuesta == "OK"){
          this.carrito = data.carrito;
        }else {
          alert(data.respuesta);
        }
      })
      .catch(error => console.log(error));
  }
}
