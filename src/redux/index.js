import {createStore, applyMiddleware} from 'redux';
import reducer from './reducer';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {routerMiddleware} from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import history from '../history';

const enhancer = applyMiddleware(routerMiddleware(history), thunk, logger);
const store = createStore(reducer, composeWithDevTools(enhancer));
window.store = store;

export default store;