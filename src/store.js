import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import history from './history';
import reducer from './reducers/';

export default createStore(reducer, applyMiddleware(routerMiddleware(history)));
