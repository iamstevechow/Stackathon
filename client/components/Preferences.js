import React, { Component } from 'react';
import { connect } from 'react-redux';

class Preferences extends Component {
  render() {
    return (
      <React.Fragment>
        <center style={{ marginBottom: '20px' }}>
          <h2>Preferences</h2>
        </center>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Preferences);
