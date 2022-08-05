import combineReducers from './Reducers/compReducers';
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const store = createStore(combineReducers, composeWithDevTools(applyMiddleware(thunk)))


export default store;