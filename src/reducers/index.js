import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import social from './social';
import stuff from './stuff';
import blog from './blog';

export default combineReducers({
  router: routerReducer,
  social,
  stuff,
  blog,
});
