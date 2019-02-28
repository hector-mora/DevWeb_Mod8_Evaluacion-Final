import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//componentes
import Tienda_Menu from './Tienda_Menu.jsx'

//estilos
import '../styles/Tienda_Productos.css'

class Tienda_Productos extends Component {
  constructor() {
    super();
    this.state = {
    		productos: [],
        carrito: [],
        cantidad: '',
        productosFiltrados: []
    };

    this.onChange = this.onChange.bind(this);
    this.filtrar = this.filtrar.bind(this);
  }

  componentDidMount() {
    this.obtenerProductos();
    this.obtenerCarrito();
  }

  obtenerProductos(){
    fetch('/articulos/all')
      .then(res => res.json())
      .then(data => {
        if(data.respuesta == "OK"){
          this.setState({productos: data.articulos});
          this.setState({productosFiltrados: data.articulos});
        }else{
          alert(data.respuesta);
        }
      })
      .catch(err => console.log(err));
  }

  obtenerCarrito(){
    fetch('/carrito/all')
      .then(res => res.json())
      .then(data => {
        if(data.respuesta == "OK"){
          this.setState({carrito: data.carrito});
        }else{
          alert(data.respuesta);
        }
      })
      .catch(err => console.log(err));
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  filtrar(e){
    if ( e.target.value != '' ) {
      let coincidencias = this.state.productos.filter( producto => {return producto.producto.toLowerCase().search(e.target.value.toLowerCase()) != -1;})
      this.setState({productosFiltrados: coincidencias})
    }else{
      this.setState({productosFiltrados: this.state.productos})
    };
  }

  agregarCarrito(index, cantidad){
    let producto = []
    producto = this.state.productosFiltrados.filter((e) => {if(e._id === index) return e;})

    if (this.state.cantidad != ''){
      fetch('/carrito/new',
            {
              method: 'POST',
              body: JSON.stringify({ producto: producto[0], cantidad: cantidad }),
              headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                      }
            })
        .then(res => res.json())
        .then(data => {
          if(data.respuesta == "OK"){
            this.obtenerCarrito();
          }else {
            console.log(data.respuesta);
          }
        })
        .catch(err => console.log(err));

      this.setState({cantidad: ''});
    } else {
      alert("Debe indicar la cantidad a comprar")
    }

  }

  mostrarProductos(){
    return this.state.productosFiltrados.map(producto => {
      let img = require('../images/' + producto.imagen);

      return (
        <div key={producto._id} className="col s6 m4 l3">
          <div className="card z-depth-4">
            <div className="card-image">
              <img src={`/${img}`} className="z-depth-2"/>
            </div>
            <div className="card-content">
              <h4>{producto.producto}</h4>
              <p><b>Precio:</b> ${producto.precio}</p>
              <p><b>Unidades:</b> {producto.unidades}</p>
            </div>
            <div className="card-action">
              <div className="row">
                <Link to={`/tienda/productos/${producto._id}`} className="col s12 m5 l5 waves-effect waves-light btn-small left">Ver más</Link>

                <input className="hide-on-small-only col m3 l3 amber lighten-4 black-text right" name="cantidad" onChange={this.onChange} type="number" min="1" max={producto.unidades}/>
                <a className="hide-on-small-only col m3 l3 btn-small waves-effect deep-orange lighten-1 right" onClick = {this.agregarCarrito.bind(this, producto._id, this.state.cantidad)} ><i className="material-icons">add_shopping_cart</i></a>

                <a className="hide-on-med-and-up col s6 btn-small waves-effect deep-orange lighten-1" onClick = {this.agregarCarrito.bind(this, producto._id, this.state.cantidad)} ><i className="material-icons">add_shopping_cart</i></a>
                <input className="hide-on-med-and-up col s6 amber lighten-4 black-text" name="cantidad" onChange={this.onChange} type="number" min="1" max={producto.unidades}/>
              </div>
            </div>
          </div>
        </div>
      )
    })
  }

  render() {
    return(
      <div className="container">
      <Tienda_Menu cantCarrito={ this.state.carrito.length }/>
      <div className="white contenedor-productos">
        <div className="row">
          <div className="col s12 m6 l6 left">
            <h4 className="titulo">Catálogo de productos</h4>
          </div>
          <div className="input-field col s12 m4 l4 right">
            <input id="busqueda" type="text" className="black-text" name="filtro" onChange={this.filtrar}/>
            <label htmlFor="busqueda">¿Qué estás buscando?</label>
          </div>
        </div>
        <div className="divider"></div>
        <div className="row productos">
            {this.mostrarProductos()}
        </div>
      </div>
      </div>
    );
  }
}

export default Tienda_Productos;
