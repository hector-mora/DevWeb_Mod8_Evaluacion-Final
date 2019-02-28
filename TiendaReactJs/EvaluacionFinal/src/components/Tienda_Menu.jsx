import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//componentes

//estilos
import '../styles/Tienda_Menu.css'

class Tienda_Menu extends Component {

  render() {
    let iconoCarrito = <li><Link className="grey-text text-darken-3" to="/tienda/carrito" ><i className="material-icons">shopping_cart</i></Link></li>;
    if(Number(this.props.cantCarrito) >=1 ) iconoCarrito = <li><Link className="grey-text text-darken-3" to="/tienda/carrito" ><i className="material-icons">shopping_cart</i><span className="badge red white-text">{ this.props.cantCarrito }</span></Link></li>

    return(
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper white">
            <div className="left grey-text text-darken-3 titulo-menu"><h5>La Bodega</h5></div>
            <ul className="right">
              <li><Link className="grey-text text-darken-3" to="/tienda/productos"><i className="material-icons">view_module</i></Link></li>
              {iconoCarrito}
              <li><Link className="grey-text text-darken-3" to="/" ><i className="material-icons">exit_to_app</i></Link></li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Tienda_Menu;
