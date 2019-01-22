import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { loginActionCreator, registerActionCreator } from "../actionCreators";
import { connect } from "react-redux";
import styles from "./theme";

class Login extends Component {
    constructor(props) {
        super(props);
        this.classes = props.classes;
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

    render() {
        return (
            <div className="login">
                <form>
                    <main className={this.classes.main}>
                        <CssBaseline />
                        <Paper className={this.classes.paper}>
                            <Avatar className={this.classes.avatar}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>
                            <form className={this.classes.form}>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="email">
                                        Email Address
                                    </InputLabel>
                                    <Input
                                        id="email"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
                                        onChange={this.handleChange}
                                    />
                                </FormControl>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="password">
                                        Password
                                    </InputLabel>
                                    <Input
                                        name="password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        onChange={this.handleChange}
                                    />
                                </FormControl>

                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={this.classes.submit}
                                    onClick={this.handleLogIn}
                                >
                                    Sign in
                                </Button>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={this.classes.submit}
                                    onClick={this.handleRegister}
                                >
                                    Register
                                </Button>
                            </form>
                            <div>{this.props.message}</div>
                        </Paper>
                    </main>

                    <div>
                        {this.props.isLoggedIn
                            ? `Hello ${this.props.userEmail}!`
                            : null}
                    </div>
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
    register: (email, password) => {
        dispatch(registerActionCreator(email, password));
    }
});

export default withStyles(styles)(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Login)
);
