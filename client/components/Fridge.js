import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFridge } from '../store/fridge';
import { FridgeCard } from './index';

class Fridge extends Component {
  componentDidMount() {
    this.props.fetchFridge(this.props.user.id);
  }
  render() {
    return (
      <React.Fragment>
        <h2>My Fridge</h2>
        {this.props.fridge.map(item => (
          <FridgeCard key={item.ingredient.id} item={item} />
        ))}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  fridge: state.fridge || []
});

const mapDispatchToProps = dispatch => ({
  fetchFridge: id => dispatch(fetchFridge(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Fridge);
