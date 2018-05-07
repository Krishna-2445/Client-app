import axios from 'axios';
import { mockPolicyHolderJson } from '../../../../__mocks__/policyholderMock';

export const POLICYHOLDER = {
  POST: 'POLICYHOLDER_POST',
  SUCCESS: 'POLICYHOLDER_SUCCESS',
  ERROR: 'POLICYHOLDER_ERROR',
};

export const successPolicyholder = policyholder => ({
  type: POLICYHOLDER.SUCCESS,
  policyholder,
});

export const errorPolicyholder = json => ({
  type: POLICYHOLDER.ERROR,
  errData: json,
});

export const createPolicyholder = (policyholderObj, navCallback) => (
  (dispatch) => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      navCallback();
      return dispatch(successPolicyholder(mockPolicyHolderJson));
    }
    return axios({
      url: '/mob_socotra_poc/policyholder/create/',
      method: 'post',
      data: policyholderObj,
      headers: { 'Content-Type': 'application/json' },
      responseType: 'json',
    })
      .then((response) => {
        // console.log(response.data);
        dispatch(successPolicyholder(response.data));
        navCallback();
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          dispatch(errorPolicyholder(error.response.data));
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          dispatch(errorPolicyholder({ errorMessage: 'bad request' }));
        } else {
          // Something happened in setting up the request that triggered an Error
          dispatch(errorPolicyholder(error));
        }
      });
  }
);
