import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CreatePolicyHolder from '../pages/create-policy-holder/CreatePolicyholder';
import { createPolicyholder } from '../store/create-policy-holder/CreatePolicyholder.action';

const mapDispatchToProps = dispatch => ({
  savePolicyholder: (policyholder, callback) => {
    dispatch(createPolicyholder(policyholder, callback));
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(reduxForm({ form: 'policyholder' })(withRouter(CreatePolicyHolder)));
