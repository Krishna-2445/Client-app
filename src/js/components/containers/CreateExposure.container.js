import { reduxForm, getFormValues } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

import CreateExposure from '../pages/create-exposure/CreateExposure';
import { addExposure, updateExposure } from '../store/exposures/Exposure.action';
import fieldValidator from '../util/fieldValidator';

const formConfig = {
  form: 'exposure',
  validate: fieldValidator,
};

export function mapStateToProps(state) {
  const initialValues = {};
  if (!(_.isEmpty(state.exposureState.selectedExposure))) {
    Object.entries(state.exposureState.selectedExposure).forEach((value) => {
      initialValues[value[0]] = value[1];
    });
  }
  return {
    exposureState: state.exposureState,
    formValues: getFormValues('exposure')(state),
    initialValues,
  };
}

const mapDispatchToProps = dispatch => ({
  addNewExposure: (exposure) => {
    dispatch(addExposure(exposure));
  },
  exposureUpdate: (exposure) => {
    dispatch(updateExposure(exposure));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm(formConfig)(withRouter(CreateExposure)));
