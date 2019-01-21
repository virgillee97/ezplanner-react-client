import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from './containers/login';



class App extends Component {
  render() {
    return (
      <div className="App">
        <main>
            <Route exact path="/" component={Login} />
        </main>
      </div>
    );
  }
}

export default App;
