import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {
  @Input() carro : any[] = [];

  constructor(private router: Router, private httpService : HttpService) { }

  ngOnInit() {
  }

  //redireccionamiento al catalogo de productos
  onMainProductos(){
    this.router.navigate(['/main/main-productos']);
  }

  //redireccionamiento al carrito
  onMainCarrito(){
    this.router.navigate(['/main/main-carrito']);
  }

  //cerrar sesion de usuario y redireccionamiento al login
  onlogout(){
    this.httpService.logoutUsuario()
      .then(data => {
        if(data.respuesta == "logout"){
          //si se logro cerrar sesion correctamente, redirecciono a Login
          this.router.navigate(['/login']);
        }else {
          alert(data.respuesta);
        }
      })
      .catch(error => console.log(error));

  }

}
