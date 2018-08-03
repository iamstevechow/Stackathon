import axios from 'axios';

const GET_FRIDGE = 'GET_FRIDGE';

const defaultFridge = [];

const getFridge = fridge => ({ type: GET_FRIDGE, fridge });

export const addToFridge = info => async dispatch => {
  try {
    const res = await axios.put('/api/fridge/add', info);
    dispatch(getFridge(res.data));
  } catch (err) {
    console.error(err);
  }
};

export const fetchFridge = id => async dispatch => {
  try {
    const res = await axios.put('/api/fridge', { id });
    dispatch(getFridge(res.data));
  } catch (err) {
    console.error(err);
  }
};

export const removeFromFridge = (arr, userId) => async dispatch => {
  try {
    const res = await axios.put('/api/fridge/remove', {
      arr: arr,
      userId: userId
    });
    dispatch(getFridge(res.data));
  } catch (err) {
    console.error(err);
  }
};

export default function(state = defaultFridge, action) {
  switch (action.type) {
    case GET_FRIDGE:
      return action.fridge;
    default:
      return state;
  }
}
