import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  edamameRecipes,
  fetchNewRecipes,
  fetchRecipes,
  setNewRecipes
} from '../store/recipes';
import { fetchFridge } from '../store/fridge';
import { OneRecipe } from './index';
import Swipeable from 'react-swipeable';
import history from '../history';
import { Button } from 'semantic-ui-react';

class NewRecipes extends Component {
  constructor() {
    super();
    this.state = { current: 0, button: 'active' };
    this.swipingLeft = this.swipingLeft.bind(this);
    this.swiped = this.swiped.bind(this);
    this.changeButtonState = this.changeButtonState.bind(this);
    this.noQuery = false;
  }
  swipingLeft(e, absX) {
    // console.log("You're Swiping to the Left...", e, absX);
  }
  async swiped(e, deltaX, deltaY, isFlick, velocity) {
    const current = this.state.current;
    this.setState({ button: 'active' });
    if (deltaX > 150 && current < 9) {
      this.setState({ current: current + 1 });
    } else if (deltaX > 150) {
      this.setState({ current: 0 });
      if (this.props.fridge.length > 0) {
        await this.props.edamameRecipes({
          q: this.props.fridge[0].ingredient.name
        });
      } else {
        await this.props.edamameRecipes();
      }
    }
  }
  changeButtonState(newState) {
    this.setState({ button: newState });
  }
  async componentDidMount() {
    await this.props.fetchFridge(this.props.user.id);
    await this.props.fetchRecipes(this.props.user.id);

      const simplifyDate = date => {
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        return new Date(year, month, day);
      };
      const ingredientsArray = this.props.fridge.filter(ingredient => {
        const today = simplifyDate(new Date());
        const expiration = simplifyDate(new Date(ingredient.expirationDate));
        const days = (expiration - today) / 86400000;
        return days >= 0;
      });
      if (ingredientsArray.length > 0) {
      await this.props.edamameRecipes({
        q: ingredientsArray[0].ingredient.name
      });
    } else {
      this.setState({ noQuery: true });
    }
  }
  componentWillUnmount() {
    this.props.setNewRecipes();
  }
  render() {
    const currentRecipe = this.props.recipes[this.state.current] || {};
    let button = this.state.button;
    if (
      button === 'active' &&
      currentRecipe.recipe &&
      this.props.savedRecipes.some(savedRecipe => {
        const uri = currentRecipe.recipe.uri;
        const edamameIdIndex = uri.indexOf('recipe');
        const edamameId = uri.slice(edamameIdIndex + 7);
        return savedRecipe.recipe.edamameId === edamameId;
      })
    ) {
      button = 'already saved';
    }
    return (
      <React.Fragment>
        <center style={{ marginBottom: '20px' }}>
          <h2>New Recipes</h2>
        </center>
        {this.state.noQuery ? (
          <React.Fragment>
            <h3>Please add something to your fridge before viewing recipes.</h3>
            <Button
              fluid
              color='orange'
              type="submit"
              onClick={() => {
                history.push('/addtofridge');
              }}
            >
              Add Something to your Fridge
            </Button>
          </React.Fragment>
        ) : currentRecipe.recipe ? (
          <Swipeable onSwipingLeft={this.swipingLeft} onSwiped={this.swiped}>
            <OneRecipe
              item={currentRecipe.recipe}
              changeButtonState={this.changeButtonState}
              button={button}
            />
          </Swipeable>
        ) : (
          <div>Loading Recipes...</div>
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
  fetchFridge: id => dispatch(fetchFridge(id)),
  setNewRecipes: () => dispatch(setNewRecipes([]))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewRecipes);
