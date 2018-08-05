import React, { Component } from 'react';
import { connect } from 'react-redux';

class CookingHistory extends Component {
  render() {
    return (
      <React.Fragment>
        <center style={{ marginBottom: '20px' }}>
          <h2>Cooking History</h2>
        </center>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CookingHistory);
