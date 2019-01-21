import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

import { loginActionCreator, registerActionCreator } from "../actionCreators";
import { connect } from "react-redux";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        };
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleLogIn = () => {
        const { email, password } = this.state;
        this.props.login(email, password);
    };

    handleRegister = () => {
        const { email, password } = this.state;
        this.props.register(email, password);
    };

    renderButtons() {
        return (
            <div>
                <Button block bsSize="large" onClick={this.handleRegister}>
                    Register
                </Button>
                <Button
                    block
                    bsSize="large"
                    onClick={this.handleLogIn}
                >
                    Login
                </Button>
            </div>
        );
        
    }

    render() {
        return (
            <div className="login">
                <form>
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

                    {this.renderButtons()}

                    <div>{this.props.
                         }</div>
                    <div>{this.props.isLoggedIn ? `Hello ${this.props.userEmail}!` : null}</div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    userEmail: (state.userInfo && state.userInfo.email) || null,
    isLoggedIn: !!state.userInfo,
    loginInProgress: state.isSigningIn,
    message: state.message
});

const mapDispatchToProps = dispatch => ({
    login: (email, password) => {
        dispatch(loginActionCreator(email, password));
    },
    register:(email, password)=>{
        dispatch(registerActionCreator(email, password));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);