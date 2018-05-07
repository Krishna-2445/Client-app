import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'react-router-redux';
import createHashHistory from 'history/createHashHistory';
import thunk from 'redux-thunk';

import reducers from './reducer.config';

// create history using #
export const history = createHashHistory();

const middleware = [
  thunk,
  routerMiddleware(history),
];

export default function configureStore() {
  const enhancers = composeWithDevTools(
    applyMiddleware(...middleware),
  );

  // create store with middleware
  const store = createStore(
    reducers,
    enhancers,
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducer.config', () => store.replaceReducer(reducers));
  }

  return store;
}
