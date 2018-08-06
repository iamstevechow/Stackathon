import axios from 'axios';

const GET_IMAGE = 'GET_IMAGE';

const defaultImage = [];

const getImage = image => ({ type: GET_IMAGE, image });

export const addImage = blob => async dispatch => {
  try {
    const res = await axios.put('/api/image/', { blob });
    const value = res.data[0].data.concepts
    dispatch(getImage(value));
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
