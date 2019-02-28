import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

//componentes
import Tienda_Menu from './Tienda_Menu.jsx'

//estilos
import '../styles/Tienda_Carrito.css'

class Tienda_Carrito extends Component {
  constructor() {
    super();
    this.state = {
    		carrito: [],
        total: 0,
        yaPague: false
    };
    this._estaMontado = false;
  }

  componentDidMount() {
    this._estaMontado = true;
    this.obtenerCarrito();
  }

  componentWillUnmount(){
    this._estaMontado = false;
  }

  obtenerCarrito(){
    fetch('/carrito/all')
      .then(res => res.json())
      .then(data => {
        if(data.respuesta == "OK"){
          let total = this.state.total

          this.setState({carrito: data.carrito});

          this.state.carrito.map(producto => {
            total += (producto.cantidad*producto.precio)
          })

          this.setState({total: total});
        }else{
          alert(data.respuesta);
        }

      })
      .catch(err => console.log(err));
  }

  obtenerProducto(producto, cantCarrito, i){
    fetch(`/articulos/${producto.producto_id}`)
      .then(res => res.json())
      .then(data => {
        if(data.respuesta == "OK"){
          this.actualizarArticulos(producto.producto_id, data.articulo.unidades, producto.cantidad, cantCarrito, i);
        }else{
          alert(data.respuesta);
        }

      })
      .catch(err => console.log(err));
  }

  actualizarArticulos(producto_id, disponible, cantidad, cantCarrito, i){
    fetch('/articulos/update',
          {
            method: 'POST',
            body: JSON.stringify({ _id: producto_id, unidades: disponible, cantidad: cantidad }),
            headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    }
          })
      .then(res => res.json())
      .then(data => {
        //si es el ultimo producto en actualizar indico que "ya pagué" todo.
        if (cantCarrito == i){
          if (this._estaMontado) {
            this.setState({yaPague: true});
          }
        };
      })
      .catch(err => console.log(err));
  }

  pagar(){
    let cantCarrito = this.state.carrito.length
    let i = 0
    this.state.carrito.map(producto => {
      i += 1
      //Eliminar del carrito
      fetch('/carrito/delete',
            {
              method: 'POST',
              body: JSON.stringify({ _id: producto._id }),
              headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                      }
            })
        .then(res => res.json())
        .then(data => {
          //Actualizar los productos
          this.obtenerProducto(producto, cantCarrito, i);
        })
        .catch(err => console.log(err));

    })
  }

  render() {
    if (this.state.yaPague) {
      return (<Redirect to='/tienda/productos'/>);
    }else{
      return(
        <div className="container">
          <Tienda_Menu />
          <div className="white contenedor-productos">
            <div className="row productos">
              <div className="col s8 m8 l8">
                {
                  this.state.carrito.map(producto => {
                    let img = require('../images/' + producto.imagen);

                    return (
                      <div key={producto._id} className="card horizontal z-depth-4">
                        <div className="card-image">
                          <img src={`/${img}`} className="carrito-img z-depth-2"/>
                        </div>
                        <div className="card-content">
                          <h4>{producto.producto}</h4>
                          <p><b>Unidades:</b> {producto.cantidad}</p>
                          <h5>Subtotal:{producto.cantidad*producto.precio}</h5>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
              <div className="col s4 m4 l4">
                <h2 className="titulo">Total: ${this.state.total}</h2>                
                <Link to='/tienda/productos' className="btn-small waves-effect deep-orange lighten-1 pagar">Regresar</Link>
                <a className="btn-small waves-effect waves-light pagar" onClick = {this.pagar.bind(this)}><i className="material-icons right">payment</i>Pagar</a>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Tienda_Carrito;
