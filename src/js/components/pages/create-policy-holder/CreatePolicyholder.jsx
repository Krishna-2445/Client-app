import React from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Label, Segment, Form } from 'semantic-ui-react';
import { Field } from 'redux-form';

import InputField from '../../elements/input-field/InputField';


const CreatePolicyHolder = ({ savePolicyholder, handleSubmit, history }) => {
  const navigateCallback = () => {
    history.push('/createPolicy');
  };
  const savePolicyHolder = (formValues) => {
    // console.log(formValues);
    savePolicyholder(formValues, navigateCallback);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit(savePolicyHolder)}>
        <Segment>
          <Label attached="top">Policyholder</Label>
          <Grid columns={2}>
            <Grid.Column>
              <Field
                name="first_name"
                component={InputField}
                labelText="First Name"
              />
            </Grid.Column>
            <Grid.Column>
              <Field
                name="last_name"
                component={InputField}
                labelText="Last Name"
              />
              <div>
                <Button type="submit">Create PolicyHolder</Button>
              </div>
            </Grid.Column>
          </Grid>
        </Segment>
      </Form>
    </div>
  );
};

CreatePolicyHolder.defaultProps = {
  handleSubmit: Function.prototype,
  savePolicyholder: Function.prototype,
  history: {},
};

CreatePolicyHolder.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  savePolicyholder: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default CreatePolicyHolder;

