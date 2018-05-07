import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer as HotLoader } from 'react-hot-loader';

import configureStore from './app/store.config';
import App from './app/app';

const store = configureStore();

const render = (Component) => {
  ReactDOM.render(
    <HotLoader>
      <Component store={store} />
    </HotLoader>,
    document.getElementById('app'),
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./app/app', () => render(App));
}
