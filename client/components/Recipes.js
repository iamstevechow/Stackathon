import React, { Component } from 'react';
import { connect } from 'react-redux';
import { edamameRecipes, fetchRecipes } from '../store/recipes';
import { OneRecipe } from './index';
import Swipeable from 'react-swipeable';

class Recipes extends Component {
  constructor() {
    super();
    this.state = { current: 0 };
    this.swipingLeft = this.swipingLeft.bind(this);
    this.swiped = this.swiped.bind(this);
  }
  swipingLeft(e, absX) {
    // console.log("You're Swiping to the Left...", e, absX);
  }
  swiped(e, deltaX, isFlick) {
    const current = this.state.current;
    if (deltaX > 150) {
      this.setState({ current: current + 1 });
    } else if (deltaX < -150) {
      this.setState({ current: current - 1 });
    }
    console.log(deltaX);
    console.log(isFlick);
  }
  componentDidMount() {
    this.props.fetchRecipes(this.props.user.id);
    // this.props.edamameRecipes({ q: 'chicken' });
  }
  render() {
    const currentRecipe = this.props.recipes[this.state.current];
    return (
      <React.Fragment>
        <h2>New Recipes</h2>
        {currentRecipe ? (
          <Swipeable onSwipingLeft={this.swipingLeft} onSwiped={this.swiped}>
            <OneRecipe item={currentRecipe} />
          </Swipeable>
        ) : null}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  recipes: state.recipes.savedRecipes || []
  // recipes: state.recipes.newRecipes || []
});

const mapDispatchToProps = dispatch => ({
  fetchRecipes: id => dispatch(fetchRecipes(id)),
  edamameRecipes: query => dispatch(edamameRecipes(query))
});

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
