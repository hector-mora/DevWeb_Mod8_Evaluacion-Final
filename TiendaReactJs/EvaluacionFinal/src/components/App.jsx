import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

//componentes
import Login from './Login.jsx';
import TiendaRouter from './TiendaRouter.jsx';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact={true} path='/' component={Login} />
            <Route path='/tienda/productos' component={TiendaRouter} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
