import React, { Component } from 'react';
import { connect } from 'react-redux';

class Preferences extends Component {
  render() {
    return <div>Preferences Page</div>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Preferences);
