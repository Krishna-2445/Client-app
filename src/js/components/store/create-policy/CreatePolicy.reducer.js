import toastr from 'toastr';
import { CREATEPOLICY } from './CreatePolicy.action';


export const initialState = {
  policyData: {},
  policyError: {},
};

const createPolicyReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATEPOLICY.SUCCESS:
      toastr.success('Policy Saved Succesfully');
      return Object.assign({}, state, {
        policy: action.policyResponse,
      });
    case CREATEPOLICY.ERROR:
      toastr.error('There was in issue creating the policy', 'Sorry!');
      return Object.assign({}, state, {
        policyholderError: action.errData,
      });
    default:
      return state;
  }
};

export default createPolicyReducer;
