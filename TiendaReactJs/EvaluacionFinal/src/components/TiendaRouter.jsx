import React, { Component } from 'react';
import { BrowserRouter as RouterDos, Route, Switch } from 'react-router-dom';
//componentes
import Login from './Login.jsx';
import Tienda_Productos from './Tienda_Productos.jsx';
import Tienda_Detalle from './Tienda_Detalle.jsx';
import Tienda_Carrito from './Tienda_Carrito.jsx';
import Tienda_Menu from './Tienda_Menu.jsx'

//estilos
import '../styles/TiendaRouter.css'

class TiendaRouter extends Component {

  render() {
    return(
      <RouterDos>
        <div className="contenedor-router">
          <Route exact={true} path='/' component={Login} />
          <Route exact={true} path='/tienda/productos' component={Tienda_Productos} />
          <Route exact={true} path='/tienda/productos/:idProducto' component={Tienda_Detalle} />
          <Route exact={true} path='/tienda/carrito' component={Tienda_Carrito} />
        </div>
      </RouterDos>
    );
  }
}

export default TiendaRouter;
