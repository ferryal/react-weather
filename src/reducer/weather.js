import { WEATHER } from '../actions/ActionTypes';

const initialState = {
  loading: false,
  item: {},
  results: {}
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case WEATHER.LOADING:
      return {
        ...state,
        loading: true
      };
    case WEATHER.FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
				item: action.payload.data
      };
    case WEATHER.FETCH_FAILED:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};
