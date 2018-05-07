import { PRODUCER_DETAILS } from './GetProducerDetails.action';

export const initialState = {
  producerData: {},
  errorData: {},
};

const producerDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCER_DETAILS.GET:
      return Object.assign({}, state, {
        isLoading: true,
        error: false,
      });
    case PRODUCER_DETAILS.SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        producerData: action.producerData,
        error: false,
      });
    case PRODUCER_DETAILS.ERROR:
      return Object.assign({}, state, {
        isLoading: false,
        errorData: action.errData,
        error: true,
      });
    default:
      return state;
  }
};

export default producerDetailsReducer;
