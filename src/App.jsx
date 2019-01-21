import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from './containers/login';
import Dashboard from './containers/dashboard';



class App extends Component {
  render() {
    return (
      <div className="App">
        <main>
            <Route exact path="/" component={Login} />
            <Route exact path="/dashboard" component={Dashboard} />
        </main>
      </div>
    );
  }
}

export default App;
