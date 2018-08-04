import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFridge, removeFromFridge } from '../store/fridge';
import { FridgeCard } from './index';
import { Button } from 'semantic-ui-react';
import history from '../history';

class Fridge extends Component {
  constructor() {
    super();
    this.state = {
      del: []
    };
    this.addToDelete = this.addToDelete.bind(this);
    this.removeFromDelete = this.removeFromDelete.bind(this);
  }
  componentDidMount() {
    this.props.fetchFridge(this.props.user.id);
  }
  componentWillUnmount() {
    this.props.removeFromFridge(this.state.del, this.props.user.id);
    this.setState({ del: [] });
  }
  addToDelete(id) {
    const del = this.state.del;
    this.setState({ del: [...del, id] });
  }
  removeFromDelete(id) {
    const del = this.state.del;
    this.setState({ del: del.filter(elem => elem !== id) });
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
          <FridgeCard
            addToDelete={this.addToDelete}
            removeFromDelete={this.removeFromDelete}
            key={item.id}
            item={item}
          />
        ))}
        {this.props.fridge.length ? null : (
          <h3>Your fridge is empty! Add some items</h3>
        )}
        {this.state.del.length > 0 ? (
          <Button
            onClick={async () => {
              await this.props.removeFromFridge(
                this.state.del,
                this.props.user.id
              );
              this.setState({ del: [] });
            }}
            fluid
          >
            Save Changes
          </Button>
        ) : null}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  const fridge = state.fridge || [];
  const sortedFridge = fridge.sort((a, b) => {
    return a.expirationDate > b.expirationDate;
  });
  return {
    user: state.user,
    fridge: sortedFridge
  };
};

const mapDispatchToProps = dispatch => ({
  fetchFridge: id => dispatch(fetchFridge(id)),
  removeFromFridge: (arr, userId) => dispatch(removeFromFridge(arr, userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Fridge);
