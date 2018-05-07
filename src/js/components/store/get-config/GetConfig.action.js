import axios from 'axios';
import { mockConfigJson } from '../../../../__mocks__/configMock';

export const CONFIG = {
  GET: 'CONFIG_GET',
  SUCCESS: 'CONFIG_SUCCESS',
  ERROR: 'CONFIG_ERROR',
};

export const getConfig = () => ({
  type: CONFIG.GET,
});

export const successConfig = config => ({
  type: CONFIG.SUCCESS,
  config,
});

export const errorConfig = json => ({
  type: CONFIG.ERROR,
  errData: json,
});

export const fetchConfig = () => (
  (dispatch) => {
    dispatch(getConfig());

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      const configObj = [];
      console.log('using mock config');
      mockConfigJson.forEach((el) => {
        if (el.name !== 'global') {
          configObj.push(el);
        }
      });
      return dispatch(successConfig(configObj));
    }

    return axios({
      url: '/mob_socotra_poc/configuration/',
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
      responseType: 'json',
    })
      .then((response) => {
        const configObj = [];
        console.log(response);
        response.data.forEach((el) => {
          if (el.name !== 'global') {
            configObj.push(el);
          }
        });
        dispatch(successConfig(configObj));
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          dispatch(errorConfig(error.response.data));
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          dispatch(errorConfig({ errorMessage: 'bad request' }));
        } else {
          // Something happened in setting up the request that triggered an Error
          dispatch(errorConfig(error));
        }
      });
  }
);
