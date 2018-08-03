import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFridge } from '../store/fridge';
import { FridgeCard } from './index';
import { Button } from 'semantic-ui-react';
import history from '../history';

class Fridge extends Component {
  componentDidMount() {
    this.props.fetchFridge(this.props.user.id);
  }
  render() {
    return (
      <React.Fragment>
        <h2>My Fridge</h2>
        <Button
          onClick={() => {
            history.push('/addtofridge');
          }}
          fluid
        >
          Add Item
        </Button>
        {this.props.fridge.map(item => (
          <FridgeCard key={item.id} item={item} />
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
