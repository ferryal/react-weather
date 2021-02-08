import { combineReducers } from 'redux';
import { reducer as weather } from './reducer/weather';

export default combineReducers({ weather });
