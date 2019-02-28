import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
//componentes

//estilos
import '../styles/Login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
    		email: '',
    		password: '',
        respuesta: ''
    };

    this.validarUsuario = this.validarUsuario.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  validarUsuario(e) {
    e.preventDefault();
    if(this.state.email == '') M.toast({html: 'Debe ingresar un email'});
    if(this.state.password == '') M.toast({html: 'Debe ingresar una contraseña'});

    if(this.state.email != '' && this.state.password != '') {
      fetch('/usuarios/',
            {
              method: 'POST',
              body: JSON.stringify(this.state),
              headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                      }
            })
        .then(res => res.json())
        .then(data => {
          this.setState({respuesta: data.respuesta});
        })
        .catch(err => console.log(err));
    }
  }

  render() {
    if(this.state.respuesta == 'Validado') {
      return (<Redirect to='/tienda/productos'/>);
    }else{
      let errorLogin,
          errorPass;
      if(this.state.respuesta != '') errorLogin = <h4 className="white-text">{this.state.respuesta}</h4>
      if(this.state.password == '' && this.state.email != '') errorPass = <span className="red-text">Ingrese el Password</span>
      return (
        <div className="contenedor-login">
          <form onSubmit={this.validarUsuario}>
            <div className="row">
              <div className="col s12 m8 offset-m2 l6 offset-l3 titulo-login">
                <h3>Inicia Sesión</h3>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12 m8 offset-m2 l6 offset-l3">
                <input name="email" onChange={this.onChange} type="email" className="validate"/>
                <label htmlFor="email" className="white-text">Email</label>
                <span className="helper-text" data-error="Ingresar un email válido"></span>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12 m8 offset-m2 l6 offset-l3">
                <input name="password" onChange={this.onChange} type="password" className="validate"/>
                <label className="white-text" htmlFor="password">Password</label>
                {errorPass}
              </div>
            </div>

            <button className="btn white red-text" type="submit" name="action">Ingresar</button>
            {errorLogin}
          </form>
        </div>
      )
    }
  }
}

export default Login;
