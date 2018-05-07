import toastr from 'toastr';
import { POLICYHOLDER } from './CreatePolicyholder.action';

toastr.options = {
  positionClass: 'toast-bottom-center',
};

const initialState = {
  policyholder: {},
  policyholderError: {},
};

const createPolicyHolderReducer = (state = initialState, action) => {
  switch (action.type) {
    case POLICYHOLDER.SUCCESS:
      toastr.success('Policyholder has been created', 'Success!');
      return Object.assign({}, state, {
        policyholder: action.policyholder,
      });
    case POLICYHOLDER.ERROR:
      toastr.error('There was in issue saving the policyholder', 'Sorry!');
      return Object.assign({}, state, {
        policyholderError: action.errData,
      });
    default:
      return state;
  }
};

export default createPolicyHolderReducer;
