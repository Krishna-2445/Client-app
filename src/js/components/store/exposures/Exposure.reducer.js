import { EXPOSURE } from './Exposure.action';

export const initialState = {
  newExposureType: {},
  exposures: [],
  selectedExposure: {},
};

const exposureReducer = (state = initialState, action) => {
  switch (action.type) {
    case EXPOSURE.TYPE:
      return Object.assign({}, state, {
        newExposureType: action.selectNewExposure,
      });
    case EXPOSURE.SELECT:
      return Object.assign({}, state, {
        selectedExposure: action.selectExposure,
      });
    case EXPOSURE.ADD:
      return {
        ...state,
        exposures: [...state.exposures, action.newExposure],
        selectedExposure: {},
      };
    case EXPOSURE.UPDATE:
      return {
        ...state,
        exposures: state.exposures.map(exp => (exp.key === action.exposure.key
          ? action.exposure : exp)),
        selectedExposure: {},
      };
    default:
      return state;
  }
};

export default exposureReducer;
