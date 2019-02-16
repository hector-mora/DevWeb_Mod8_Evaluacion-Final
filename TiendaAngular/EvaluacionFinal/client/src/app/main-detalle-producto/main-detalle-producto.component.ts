import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-main-detalle-producto',
  templateUrl: './main-detalle-producto.component.html',
  styleUrls: ['./main-detalle-producto.component.css']
})
export class MainDetalleProductoComponent implements OnInit {
  detProducto: any = {};

  constructor(private router: Router, private httpService : HttpService) { }

  ngOnInit() {
    this.detProducto = this.httpService.obtenerProducto();
  }

  //regreso al catalogo de productos
  regresar(){
    this.detProducto = {};
    this.router.navigate(['/main']);
  }

}
