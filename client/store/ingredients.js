import axios from 'axios';

const GET_INGREDIENTS = 'GET_INGREDIENTS';

const defaultIngredients = [];

const getIngredients = ingredients => ({ type: GET_INGREDIENTS, ingredients });

export const fetchIngredients = () => async dispatch => {
  try {
    const res = await axios.get('/api/ingredient');
    dispatch(getIngredients(res.data));
  } catch (err) {
    console.error(err);
  }
};

export default function(state = defaultIngredients, action) {
  switch (action.type) {
    case GET_INGREDIENTS:
      return action.ingredients;
    default:
      return state;
  }
}
