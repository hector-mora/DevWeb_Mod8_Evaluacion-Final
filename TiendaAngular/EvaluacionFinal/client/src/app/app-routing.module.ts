import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { MainProductosComponent } from './main-productos/main-productos.component';
import { MainDetalleProductoComponent } from './main-detalle-producto/main-detalle-producto.component';
import { MainCarritoComponent } from './main-carrito/main-carrito.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainComponent ,
    children: [
      { path: '', redirectTo: 'main-productos', pathMatch: 'full' },
      { path: 'main-productos', component: MainProductosComponent },
      { path: 'main-detalle', component: MainDetalleProductoComponent },
      { path: 'main-carrito', component: MainCarritoComponent },
      { path: 'main-menu', component: MainMenuComponent }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
