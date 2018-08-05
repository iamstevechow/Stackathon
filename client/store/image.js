import axios from 'axios';

const GET_IMAGE = 'GET_IMAGE';

const defaultImage = '';

const getImage = image => ({ type: GET_IMAGE, image });

export const addImage = img => async dispatch => {
  try {
    const res = await axios.put('/api/image/', { img });
    dispatch(getImage(res.data));
  } catch (error) {
    console.error(error);
  }
};

export default function(state = defaultImage, action) {
  switch (action.type) {
    case GET_IMAGE:
      return action.image;
    default:
      return state;
  }
}
