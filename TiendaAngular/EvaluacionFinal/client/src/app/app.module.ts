import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpService } from './http.service';
import { MainComponent } from './main/main.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { MainProductosComponent } from './main-productos/main-productos.component';
import { FilterPipeModule } from 'ngx-filter-pipe';

import { MiMaterialModule } from './material-module';
import { MainDetalleProductoComponent } from './main-detalle-producto/main-detalle-producto.component';
import { MainCarritoComponent } from './main-carrito/main-carrito.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    MainMenuComponent,
    MainProductosComponent,
    MainDetalleProductoComponent,
    MainCarritoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    MiMaterialModule,
    FilterPipeModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
