import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FirstTimeUser } from './index';

class Preferences extends Component {
  render() {
    return (
      <React.Fragment>
        <FirstTimeUser />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Preferences);
