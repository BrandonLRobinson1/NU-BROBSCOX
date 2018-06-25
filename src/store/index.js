import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
// import dummyStore from './dummyStore';
import signUp from './signUp';
import logIn from './logIn';

const rootReducer = combineReducers({
  signUp,
  logIn
})

export const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : f => f)
);