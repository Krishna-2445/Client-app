import axios from 'axios';

export const PRODUCER_DETAILS = {
  GET: 'PRODUCER_DETAILS_GET',
  SUCCESS: 'PRODUCER_DETAILS_SUCCESS',
  ERROR: 'PRODUCER_DETAILS_ERROR',
};
export const successProducerData = producerData => ({
  type: PRODUCER_DETAILS.SUCCESS,
  producerData,
});

const producerResponseData = {
  amlCertificationUpToDate: true,
  annualTrainingUpToDate: false,
  appointmentStatus: '0',
  appointmentEffectiveDate: '2001-01-01',
  appointmentTerminationDate: '2001-01-01',
  licenseTypeCode: 'A',
  licenseNumber: '7999930',
  licenseEffectiveDate: '2004-03-31',
  licenseState: 'NE',
  company: 'Mutual',
  producerAppointmentStatus: '1',
  state: 'NE',
};

export const errorProducerData = json => ({
  type: PRODUCER_DETAILS.ERROR,
  errData: json,
});

export const fetchProducerDetails = producerNumber => (
  (dispatch) => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      return dispatch(successProducerData(producerResponseData));
    }

    // test producer number 0189697
    return axios({
      url: `/mob_socotra_poc/producer/${producerNumber}/`,
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
      responseType: 'json',
    })
      .then((response) => {
        // console.log(response);
        dispatch(successProducerData(response.data));
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          dispatch(errorProducerData(error.response.data));
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          dispatch(errorProducerData({ errorMessage: 'bad request' }));
        } else {
          // Something happened in setting up the request that triggered an Error
          dispatch(errorProducerData(error));
        }
      });
  }
);

