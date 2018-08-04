import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  edamameRecipes,
  fetchNewRecipes,
  fetchRecipes
} from '../store/recipes';
import { fetchFridge } from '../store/fridge';
import { OneRecipe } from './index';
import Swipeable from 'react-swipeable';

class NewRecipes extends Component {
  constructor() {
    super();
    this.state = { current: 0, button: 'active' };
    this.swipingLeft = this.swipingLeft.bind(this);
    this.swiped = this.swiped.bind(this);
    this.changeButtonState = this.changeButtonState.bind(this);
  }
  swipingLeft(e, absX) {
    // console.log("You're Swiping to the Left...", e, absX);
  }
  swiped(e, deltaX, deltaY, isFlick, velocity) {
    const current = this.state.current;
    this.setState({ button: 'active' });
    if (deltaX > 150) {
      this.setState({ current: current + 1 });
    }
  }
  changeButtonState(newState) {
    this.setState({ button: newState });
  }
  componentDidMount() {
    this.props.fetchNewRecipes({ userId: this.props.user.id, ingredients: [] });
    this.props.fetchFridge(this.props.user.id);
    this.props.fetchRecipes(this.props.user.id);
    // this.props.edamameRecipes({ q: 'chicken' });
  }
  render() {
    const currentRecipe = this.props.recipes[this.state.current] || {};
    let button = this.state.button;
    if (
      button === 'active' &&
      this.props.savedRecipes.some(
        recipe => recipe.recipeId === currentRecipe.id
      )
    ) {
      button = 'already saved';
    }
    return (
      <React.Fragment>
        <h2>New Recipes</h2>
        {currentRecipe ? (
          <Swipeable onSwipingLeft={this.swipingLeft} onSwiped={this.swiped}>
            <OneRecipe
              item={currentRecipe}
              changeButtonState={this.changeButtonState}
              button={button}
            />
          </Swipeable>
        ) : (
          <div>Sorry there are no more recipes!</div>
        )}
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
    recipes: state.recipes.newRecipes || [],
    fridge: sortedFridge,
    savedRecipes: state.recipes.savedRecipes || []
  };
};

const mapDispatchToProps = dispatch => ({
  fetchNewRecipes: info => dispatch(fetchNewRecipes(info)),
  fetchRecipes: id => dispatch(fetchRecipes(id)),
  edamameRecipes: query => dispatch(edamameRecipes(query)),
  fetchFridge: id => dispatch(fetchFridge(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewRecipes);
