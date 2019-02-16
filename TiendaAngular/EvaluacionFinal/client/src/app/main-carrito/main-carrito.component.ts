import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-main-carrito',
  templateUrl: './main-carrito.component.html',
  styleUrls: ['./main-carrito.component.css']
})
export class MainCarritoComponent implements OnInit {
  carrito : any[] = [];
  total = 0;
  error:string;

  constructor(private router: Router, private httpService : HttpService) { }

  ngOnInit() {
    //obtengo los articulos en el carrito y genero un total de compra
    this.httpService.actualizarCarrito()
      .then(data => {
        if(data.respuesta == "OK"){
          this.carrito = data.carrito;

          //con el carrito obtenido genero un total de la compra
          for (var i = 0; i < this.carrito.length; i++) {
            this.total += this.carrito[i].precio * this.carrito[i].cantidad;
        	}
        }else {
          alert(data.respuesta);
        }
      })
      .catch(error => console.log(error));
  }

  //regreso al catalogo de productos
  regresar(){
    this.router.navigate(['/main']);
  }

  //gestiono el pago de los articulos en el carrito
  pagar(){
    //Recorro el carrito actualizando el inventario y eliminando del carrito
    for (var i = 0; i < this.carrito.length; i++) {
      let producto = this.carrito[i];

      //actualizo el inventario
      this.httpService.actualizaArticulosBD({_id: producto.producto_id, unidades: producto.unidades, cantidad: producto.cantidad})
        .then(data => {
          if(data.respuesta == "OK"){
            //si se actualizo el inventario coorectamente, elimino el articulo del carrito.
            this.httpService.eliminaCarritoBD({_id: producto._id})
            .then(data => {
              if(data.respuesta == "OK"){
                //salir al catalogo de compras si el carrito esta vacio
                this.salirCatalogo();
              }else {
                //si NO se elimino el articulo del carrito coorectamente retorno el mensaje
                alert(data.respuesta);
              }
            })
            .catch(error => console.log(error));
          }else {
            //si NO se actualizo el inventario coorectamente retorno el mensaje
            alert(data.respuesta);
          }
        })
        .catch(error => console.log(error));
    }
  }

  //salir al catalogo de compras si el carrito esta vacio
  salirCatalogo(){
    this.httpService.actualizarCarrito()
      .then(data => {
        if(data.carrito.length == 0){
          this.router.navigate(['/main']);
        }
      })
      .catch(error => console.log(error));
  }

}
