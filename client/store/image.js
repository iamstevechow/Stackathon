import axios from 'axios';

const GET_IMAGE = 'GET_IMAGE';
const GET_URL = 'GET_URL';

const defaultImage = {arr:[],url:''};

const getImage = image => ({ type: GET_IMAGE, image });
const getUrl = url => ({ type: GET_URL, url });

export const addImage = blob => async dispatch => {
  try {
    const res = await axios.put('/api/image/', { blob });
    const value = res.data.value[0].data.concepts
    const url = res.data.url
    dispatch(getImage(value));
    dispatch(getUrl(url))
  } catch (error) {
    console.error(error);
  }
};

export default function(state = defaultImage, action) {
  switch (action.type) {
    case GET_IMAGE:
      return {...state, arr:action.image}
      case GET_URL:
      return {...state, url:action.url}
    default:
      return state;
  }
}
