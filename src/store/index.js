import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
// import dummyStore from './dummyStore';
import signUp from './signUp';
import logIn from './logIn';
import location from './location';

const rootReducer = combineReducers({
  signUp,
  logIn,
  location
})

export const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : f => f)
);