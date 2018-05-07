import { CONFIG } from './GetConfig.action';

export const initialState = {
  isLoading: false,
  config: [],
  error: false,
  errorData: [],
};

const configReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONFIG.GET:
      return Object.assign({}, state, {
        isLoading: true,
        error: false,
      });
    case CONFIG.SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        config: action.config,
        error: false,
      });
    case CONFIG.ERROR:
      return Object.assign({}, state, {
        isLoading: false,
        errorData: action.errData,
        error: true,
      });
    default:
      return state;
  }
};

export default configReducer;
