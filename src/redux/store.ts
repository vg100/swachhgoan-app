import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {AsyncStorageService} from '../services/AsyncStorage';
import {EventReducer} from './reducer/eventReducer';
import { fileReducer } from './reducer/FileReducer';
import { LoaderReducer } from './reducer/loaderReducer';
import {allUsersReducer, UserReducer} from './reducer/userReducer';

const logger = (store: any) => (next: any) => (action: any) => {
  //logger
  if (typeof action === 'function') console.log('dispatching a function');
  else console.log('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState);
  return result;
};

const reducer = combineReducers({
  userLogin: UserReducer,
  event: EventReducer,
  allUsers: allUsersReducer,
  file:fileReducer,
  appLoader:LoaderReducer
});

const middleware = [logger, thunk];

const store = createStore(
  reducer,

  applyMiddleware(...middleware),
);

export default store;
