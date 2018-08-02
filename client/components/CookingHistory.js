import React, { Component } from 'react';
import { connect } from 'react-redux';

class CookingHistory extends Component {
  render() {
    return <div>Cooking History Page</div>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CookingHistory);
