import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRecipes, removeFromRecipes } from '../store/recipes';
import { RecipeCard } from './index';
import { Button } from 'semantic-ui-react';

class MyRecipes extends Component {
  constructor() {
    super();
    this.state = {
      del: []
    };
    this.addToDelete = this.addToDelete.bind(this);
    this.removeFromDelete = this.removeFromDelete.bind(this);
  }
  componentDidMount() {
    this.props.fetchRecipes(this.props.user.id);
  }
  componentWillUnmount() {
    this.props.removeFromRecipes(this.state.del, this.props.user.id);
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
        <h2>My Recipes</h2>
        {this.props.recipes.map(item => (
          <RecipeCard
            addToDelete={this.addToDelete}
            removeFromDelete={this.removeFromDelete}
            key={item.id}
            item={item}
          />
        ))}
        {this.state.del.length > 0 ? (
          <Button
            style={{ marginTop: '10px' }}
            onClick={async () => {
              await this.props.removeFromRecipes(
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

const mapStateToProps = state => ({
  user: state.user,
  recipes: state.recipes.savedRecipes || []
});

const mapDispatchToProps = dispatch => ({
  fetchRecipes: id => dispatch(fetchRecipes(id)),
  removeFromRecipes: (arr, userId) => dispatch(removeFromRecipes(arr, userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(MyRecipes);
