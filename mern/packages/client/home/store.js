import {thunk, logger} from 'common/utils/middleware';
import rootReducer from 'home/reducers/rootReducer';
import {createStore, applyMiddleware} from 'redux';

const middleware = [thunk];

if (process.env.NODE_ENV === 'production') {
  middleware.push(logger);
}

export default createStore(
  rootReducer,
  applyMiddleware(...middleware)
);
