import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button} from "react-bootstrap";
import { logoutActionCreator} from "../actionCreators";


class Dashboard extends Component {
  handleLogOut =  () => {
    this.props.logout();
  };

  render() {
    return (
      <div>
      <div>
        {`HELLO ${this.props.userEmail}!!!!`}
      </div>
      
      <Button
          block
          bsSize="large"
          onClick={this.handleLogOut}
      >
          Logout
      </Button>
      <div>{this.props.message}</div>
    </div>
    );
  }
}


const mapStateToProps = state => ({
    state,
    userEmail: (state.userInfo && state.userInfo.email) || null,
    message: state.message || null,
});

const mapDispatchToProps = dispatch => ({
  logout: () => {
      dispatch(logoutActionCreator());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
