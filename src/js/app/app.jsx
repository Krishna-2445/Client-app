import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider, connect } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import RootRoutes from './root-routes';
import { history } from './store.config';
import { fetchConfig } from '../components/store/get-config/GetConfig.action';
import '../../../node_modules/toastr/build/toastr.min.css';

import '../../styles/styles.less';

class App extends Component {
  componentDidMount() {
    this.props.getFormConfig();
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <ConnectedRouter history={history}>
          <RootRoutes />
        </ConnectedRouter>
      </Provider>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

const mapDispatchToProps = dispatch => ({
  getFormConfig: () => {
    dispatch(fetchConfig());
  },
});

App.defaultProps = {
  getFormConfig: Function.prototype,
};

App.propTypes = {
  store: PropTypes.object.isRequired,
  getFormConfig: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
