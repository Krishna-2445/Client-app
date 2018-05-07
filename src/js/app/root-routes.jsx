import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import CreatePolicyContainer from '../components/containers/CreatePolicy.container';
import MooHeaderContainer from '../components/theme/moo-header.container';
import CreatePolicyholderContainer from '../components/containers/CreatePolicyholder.container';
import CreateExposureContainer from '../components/containers/CreateExposure.container';

const RootRoutes = () => (
  <div>
    <Route path="/" component={MooHeaderContainer} />
    <Container>
      <Switch>
        <Route path="/createPolicy" component={CreatePolicyContainer} />
        <Route path="/createPolicyholder" component={CreatePolicyholderContainer} />
        <Route path="/createExposure" component={CreateExposureContainer} />
        <Redirect from="/" to="/createPolicyholder" />
      </Switch>
    </Container>
  </div>
);

export default RootRoutes;
