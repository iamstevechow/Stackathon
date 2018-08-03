import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Auth,
  UserHome,
  Fridge,
  Recipes,
  MyRecipes,
  CookingHistory,
  Preferences,
  AddToFridge,
  AddToFridgeForm
} from './components/index';
import { me } from './store';

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;
    return isLoggedIn ? (
      <Switch>
        <Route path="/fridge" component={Fridge} />
        <Route path="/recipes" component={Recipes} />
        <Route path="/myrecipes" component={MyRecipes} />
        <Route path="/cookinghistory" component={CookingHistory} />
        <Route path="/preferences" component={Preferences} />
        <Route path="/addtofridge" component={AddToFridge} />
        <Route path="/fridgeform" component={AddToFridgeForm} />
        <Route component={UserHome} />
      </Switch>
    ) : (
      <Switch>
        <Route component={Auth} />
      </Switch>
    );
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  };
};

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me());
    }
  };
};

export default withRouter(connect(mapState, mapDispatch)(Routes));

Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
