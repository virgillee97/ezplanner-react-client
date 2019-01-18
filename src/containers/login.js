import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import firebase from '../components/Firebase/Firebase'
// import { createStore } from 'redux'

export default class Login extends Component {
    constructor(props) {
        super(props);
        // console.log(props)

        this.state = {
            email: '',
            password: '',
            logged_in: false,
            message:'',
            email_auth:''
        };
    }

    validateForm() {
        console.log(/\d/.exec(this.state.password) + "validating regular exp");
        return this.state.email.length > 0 && this.state.password.length > 8 && (/\d/.exec(this.state.password)===true);
    }
    loginState(){
        console.log(this.state.logged_in);
        return this.state.logged_in;
    }


    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleLogOut = () =>{
            if (!this.props.disabled){
                
                firebase.auth().signOut().then(function() {
                    
                    // Sign-out successful.
                  }).catch(function(error) {
                    // An error happened.
                    console.log(error);
                  });
                  this.setState({
                    message:'logged out',
                    logged_in: false
                });
            }
    }

    handleLogIn = () =>{
        if (this.validateForm()){
            this.setState({
                message: 'Signed in',
                logged_in: true
            });
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(error=> {
            this.setState({
                message: 'Sign in failed',
                logged_in: false
            });
            // Handle Errors here.
            console.log(error.code);
            console.log(error.message);

          });
        }
    }

    handleRegister =() =>{
        if (this.state.password.length>8){
            this.setState({
                message: 'account created'
            });
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(error=> {
            this.setState({
                message: 'account creation failed'
            });
            // Handle Errors here.
            console.log(error.code);
            console.log(error.message);

          });
        }
    }



    

    updateButtonView (){
        console.log(this.state.logged_in);
        if(this.state.logged_in){
            return(
                <div>
                <Button
                        block
                        bsSize="large"
                        disable={!this.validateForm()}
                        onClick={this.handleLogOut}
                    >
                        Logout
                    </Button>
                </div>
            );
        }else{
            return(
                <div>
                <Button
                        block
                        bsSize="large"
                        onClick={this.handleRegister}
                    >
                        Register
                    </Button>
                    <Button
                        block
                        bsSize="large"
                        disable={!this.validateForm()}
                        onClick={this.handleLogIn}
                    >
                        Login
                    </Button>
                </div>
            );
        }
    }



    render() {
        return (
            <div className="login">
                <form >
                    <FormGroup controlId="email" bsSize="large">
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                            autoFocus
                            type="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </FormGroup>
                    {this.updateButtonView()}
                    
                    
                    
                    <div>{this.state.message}</div>
                </form>
                
            </div>
        );
    }
}