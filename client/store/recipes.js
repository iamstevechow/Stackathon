import axios from 'axios';

const GET_RECIPES = 'GET_RECIPES';
const SET_NEW_RECIPES = 'SET_NEW_RECIPES';

const defaultRecipes = {
  newRecipes: [],
  savedRecipes: []
};

const setNewRecipes = recipes => ({ type: SET_NEW_RECIPES, recipes });

const getRecipes = recipes => ({ type: GET_RECIPES, recipes });

export const edamameRecipes = request => async dispatch => {
  try {
    const res = await axios.put('/api/recipe/edamame', request);
    dispatch(setNewRecipes(res.data));
  } catch (err) {
    console.error(err);
  }
};

export const fetchRecipes = id => async dispatch => {
  try {
    const res = await axios.put('/api/recipe', { id });
    dispatch(getRecipes(res.data));
  } catch (err) {
    console.error(err);
  }
};

export const fetchNewRecipes = info => async dispatch => {
  try {
    const res = await axios.put('/api/recipe/new', { info });
    dispatch(setNewRecipes(res.data));
  } catch (err) {
    console.error(err);
  }
};

export const addToRecipes = ids => async dispatch => {
  try {
    const res = await axios.put('/api/recipe/add', ids);
    dispatch(getRecipes(res.data));
  } catch (err) {
    console.error(err);
  }
};

export const removeFromRecipes = (arr, userId) => async dispatch => {
  try {
    const res = await axios.put('/api/recipe/remove', {
      arr: arr,
      userId: userId
    });
    dispatch(getRecipes(res.data));
  } catch (err) {
    console.error(err);
  }
};

export default function(state = defaultRecipes, action) {
  switch (action.type) {
    case GET_RECIPES:
      return { ...state, savedRecipes: action.recipes };
    case SET_NEW_RECIPES:
      return { ...state, newRecipes: action.recipes };
    default:
      return state;
  }
}
