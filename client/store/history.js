import axios from 'axios';

const GET_HISTORY = 'GET_HISTORY';
const ADD_HISTORY = 'ADD_HISTORY'

const defaultHistory = []

const getHistory = history => ({ type: GET_HISTORY, history });

export const addToHistory = info => async dispatch => {
  try {
    const res = await axios.put('/api/history/add', info);
    dispatch(getHistory(res.data));
  } catch (err) {
    console.error(err);
  }
};

export const fetchHistory = id => async dispatch => {
  try {
    const res = await axios.put('/api/history', { id });
    dispatch(getHistory(res.data));
  } catch (err) {
    console.error(err);
  }
};

export default function(state = defaultHistory, action) {
  switch (action.type) {
    case GET_HISTORY:
      return action.history;
    default:
      return state;
  }
}
