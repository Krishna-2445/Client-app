import axios from 'axios';
import { mockPolicyResponse } from '../../../../__mocks__/policyMock';

export const CREATEPOLICY = {
  POST: 'CREATEPOLICY_POST',
  SUCCESS: 'CREATEPOLICY_SUCCESS',
  ERROR: 'CREATEPOLICY_ERROR',
};

export const successPolicy = policyResponse => ({
  type: CREATEPOLICY.SUCCESS,
  policyResponse,
});

export const errorPolicy = json => ({
  type: CREATEPOLICY.ERROR,
  errData: json,
});


const removeFields = (policyObj) => {
  const copyPolicyObj = Object.assign(policyObj);
  delete policyObj.paymentSchedule;
  delete policyObj.appointmentEffectiveDate;
  delete policyObj.appointmentTerminationDate;
  delete policyObj.licenseTypeCode;
  delete policyObj.annualTrainingUpToDate;
  return copyPolicyObj;
};

export const createPolicy = policyFields => (
  (dispatch, getState) => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      return dispatch(successPolicy(mockPolicyResponse));
    }

    const policyholderLocator = getState().policyholderState.policyholder.locator;
    const productName = getState().configState.config[0].name;
    const paymentScheduleName = policyFields.paymentSchedule;
    const producerAppointmentStatus = policyFields.producerAppointmentStatus;
    const policyObj = removeFields(policyFields);
    const requestObj = Object.assign({}, { fieldValues: policyObj }, { policyholderLocator },
      { productName }, { exposures: [] }, { fieldGroups: [] }, { finalize: false },
      { paymentScheduleName }, { policyEndTimestamp: 0 },
      { policyStartTimestamp: 0 }, { producerAppointmentStatus });
    // console.log(requestObj);

    return axios({
      url: '/mob_socotra_poc/policy/',
      method: 'post',
      data: requestObj,
      headers: { 'Content-Type': 'application/json' },
      responseType: 'json',
    })
      .then((response) => {
        // console.log(response.data);
        dispatch(successPolicy(response.data));
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          dispatch(errorPolicy(error.response.data));
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          dispatch(errorPolicy({ errorMessage: 'bad request' }));
        } else {
          // Something happened in setting up the request that triggered an Error
          dispatch(errorPolicy(error));
        }
      });
  }
);

