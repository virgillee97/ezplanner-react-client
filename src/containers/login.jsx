import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import firebase from "../services/firebase";
import { loginActionCreator } from "../actionCreators";
import { connect } from "react-redux";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            logged_in: false,
            message: ""
        };
    }

    validateForm() {
        return true;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleLogOut = async () => {
        try {
            await firebase.auth().signOut();

            this.setState({
                message: "logged out",
                logged_in: false
            });
        } catch (error) {
            console.log(`ERROR LOGGING OUT: ${error.code} - ${error.message}`);
        }
    };

    handleLogIn = () => {
        const { email, password } = this.state;
        this.props.login(email, password);
    };

    handleRegister = async () => {
        let account_created = true;

        try {
            await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);
        } catch (error) {
            account_created = false;
            console.log(`ERROR REGISTERING: ${error.code} - ${error.message}`);
        }

        this.setState({
            message: `account ${!account_created ? 'not ' : ''}created`,
            account_created
        });
    };

    renderButtons() {
        if (this.state.logged_in) {
            return (
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
        } else {
            return (
                <div>
                    <Button block bsSize="large" onClick={this.handleRegister}>
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

                    <div>{this.state.message}</div>
                    <div>{this.props.isLoggedIn ? `Hello ${this.props.userEmail}!` : null}</div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    userEmail: (state.userInfo && state.userInfo.email) || null,
    isLoggedIn: !!state.userInfo,
    loginInProgress: state.isSigningIn
});

const mapDispatchToProps = dispatch => ({
    login: (email, password) => {
        dispatch(loginActionCreator(email, password));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);