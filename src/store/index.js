import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import Reducers from './reducers';
import {composeWithDevTools} from 'remote-redux-devtools';

const middleware = [thunkMiddleware];

const compose = composeWithDevTools({realtime: true});

const store = createStore(Reducers, compose(applyMiddleware(...middleware)));

export default store;
