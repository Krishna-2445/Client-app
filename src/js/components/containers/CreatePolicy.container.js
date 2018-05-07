import { connect } from 'react-redux';
import { reduxForm, getFormValues, change } from 'redux-form';
import { withRouter } from 'react-router-dom';
import CreatePolicy from '../pages/create-policy/CreatePolicy';
import { createPolicy } from '../store/create-policy/CreatePolicy.action';
import { fetchProducerDetails } from '../store/get-producer-details/GetProducerDetails.action';
import { selectNewExposure, viewExposure } from '../store/exposures/Exposure.action';
import fieldValidator from '../util/fieldValidator';
// import { getPrice } from '../store/get-price/GetPrice.action';

const formConfig = {
  form: 'policy',
  validate: fieldValidator,
};

export function mapStateToProps(state) {
  const configFields = [];
  let paymentSchedules = [];
  const configExposures = [];
  const exposures = state.exposureState.exposures;
  if (state.configState.config.length !== 0) {
    state.configState.config.map(config =>
      Object.assign(configFields, config.policyConfiguration.fields));
    state.configState.config.map(config =>
      Object.assign(configExposures, config.policyConfiguration.exposures));

    const tempArr = state.configState.config.map(config =>
      config.policyConfiguration.paymentSchedules)[0];
    const options = [];
    tempArr.forEach((obj) => {
      const newOpt = {};
      newOpt.key = obj.name;
      newOpt.text = obj.displayName;
      newOpt.value = obj.name;
      options.push(newOpt);
    });

    paymentSchedules = options;
  }
  const producerData = state.producerDetailsState.producerData;
  const formValues = getFormValues('policy')(state);

  return {
    configFields,
    paymentSchedules,
    producerData,
    formValues,
    configExposures,
    exposures,
    // priceState: state.priceState,
  };
}

const mapDispatchToProps = dispatch => ({
  createPolicy: (policy) => {
    dispatch(createPolicy(policy));
  },
  getProducerDetails: (producerNumber) => {
    dispatch(fetchProducerDetails(producerNumber));
  },
  changeField: (fieldName, fieldValue) => {
    dispatch(change('policy', fieldName, fieldValue));
  },
  selectNewExposure: (type) => {
    dispatch(selectNewExposure(type));
  },
  selectedExposure: (exposure) => {
    dispatch(viewExposure(exposure));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm(formConfig)(withRouter(CreatePolicy)));
