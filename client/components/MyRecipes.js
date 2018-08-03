import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRecipes } from '../store/recipes';
import { RecipeCard } from './index';

class MyRecipes extends Component {
  componentDidMount() {
    this.props.fetchRecipes(this.props.user.id);
  }
  render() {
    return (
      <React.Fragment>
        <h2>My Recipes</h2>
        {this.props.recipes.map(item => (
          <RecipeCard key={item.id} item={item} />
        ))}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  recipes: state.recipes.savedRecipes || []
});

const mapDispatchToProps = dispatch => ({
  fetchRecipes: id => dispatch(fetchRecipes(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(MyRecipes);
