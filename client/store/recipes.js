import axios from 'axios';

const GET_RECIPES = 'GET_RECIPES';

const defaultRecipes = {
  newRecipes: [],
  savedRecipes: []
};

const getRecipes = recipes => ({ type: GET_RECIPES, recipes });

export const fetchRecipes = id => async dispatch => {
  try {
    const res = await axios.put('/api/recipe', { id });
    dispatch(getRecipes(res.data));
  } catch (err) {
    console.error(err);
  }
};

export default function(state = defaultRecipes, action) {
  switch (action.type) {
    case GET_RECIPES:
      return { ...state, savedRecipes: action.recipes };
    default:
      return state;
  }
}
