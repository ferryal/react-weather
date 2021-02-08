import axios from 'axios';
import config from '../config';
import { WEATHER } from './ActionTypes';


function loading() {
  return {
    type: WEATHER.LOADING
  };
}

function fetchSuccess(data) {
  return {
    type: WEATHER.FETCH_SUCCESS,
    payload: { data }
  };
}

function fetchFailed() {
  return {
    type: WEATHER.FETCH_FAILED
  };
}

export function fetchForecast(city) {
  return (dispatch) => {
    dispatch(loading());
    axios.get(`${config.apiUrl}/onecall?lat=${city.lat}&lon=${city.long}&units=metric&appid=${config.apiKey}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((res) => {
      if (res.status === 200) {
        const response = res.data;
        dispatch(fetchSuccess(response));
      } else {
        dispatch(fetchFailed());
      }
    }).catch(() => {
      dispatch(fetchFailed());
    });
  };
}