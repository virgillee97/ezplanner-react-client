import React, { Component } from 'react';
import { connect } from 'react-redux';

class Dashboard extends Component {
  render() {
    return (
      <div>
        {`HELLO ${this.props.userEmail}!!!!`}
      </div>
    );
  }
}

const mapStateToProps = state => ({
    state,
    userEmail: (state.userInfo && state.userInfo.email) || null
});

export default connect(mapStateToProps)(Dashboard);
