import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//componentes
import Tienda_Menu from './Tienda_Menu.jsx'

//estilos
import '../styles/Tienda_Detalle.css'

class Tienda_Detalle extends Component {
  constructor() {
    super();

    this.state = {
    		producto: '',
        precio: '',
        imagen: ''
    };

  }

  componentDidMount() {
    this.obtenerProducto();
  }

  obtenerProducto(){
    let img = ''
    const { match: { params } } = this.props;

    fetch(`/articulos/${params.idProducto}`)
      .then(res => res.json())
      .then(data => {
        if(data.respuesta == "OK"){
          this.setState({producto: data.articulo.producto});
          this.setState({precio: data.articulo.precio});
          img = require('../images/' + data.articulo.imagen);
          this.setState({imagen: img});
        }else{
          alert(data.respuesta);
        }

      })
      .catch(err => console.log(err));
  }

  render() {
      return(
        <div className="container">
        <Tienda_Menu />
        <div className="white contenedor-productos">
          <div className="row productos">
            <div className="col s12 m12 l12">
              <div className="card horizontal z-depth-4">
                <div className="card-image col s4 m4 l4">
                  <img src={`/${this.state.imagen}`} className="responsive-img z-depth-2 img_detalle"/>
                </div>
                <div className="card-stacked col s8 m8 l8">
                  <div className="card-content">
                    <h4>{this.state.producto}</h4>
                    <p>Precio: ${this.state.precio}</p>
                  </div>
                </div>
              </div>
              <div className="card-action">
                <Link to="/tienda/productos" className="waves-effect waves-light btn-small">Atrás</Link>
              </div>
            </div>
          </div>
        </div>
        </div>
      );
  }
}

export default Tienda_Detalle;
