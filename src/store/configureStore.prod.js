import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
// Removed this in production: import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';

export default function configureStoreDev(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk)
  );
}

//you can add extra libraries for hot reloading and redux dev-tools if needed
//middlewares also can be login, crash reports
