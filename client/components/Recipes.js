import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRecipes } from '../store/recipes';
import { OneRecipe } from './index';

class Recipes extends Component {
  constructor() {
    super();
    this.state = { current: 0 };
  }
  componentDidMount() {
    this.props.fetchRecipes(this.props.user.id);
  }
  render() {
    const currentRecipe = this.props.recipes[this.state.current];
    return (
      <React.Fragment>
        <h2>New Recipes</h2>
        {currentRecipe ? <OneRecipe item={currentRecipe} /> : null}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  recipes: state.recipes || []
});

const mapDispatchToProps = dispatch => ({
  fetchRecipes: id => dispatch(fetchRecipes(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
