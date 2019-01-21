import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import Login from './containers/login';
import Dashboard from './containers/dashboard';
import firebase from './services/firebase';
import { connect } from 'react-redux';
import { loginSuccessfulActionCreator } from './actionCreators';



class App extends Component {
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user!=null) {
                this.props.login(user);
            }
        })
    }

    render() {
        return (
            <div className="App">
                <main>
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/" component={Login} />
                </main>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    state
})

const mapDispatchToProps = dispatch => ({
    login: user => dispatch(loginSuccessfulActionCreator(user))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
