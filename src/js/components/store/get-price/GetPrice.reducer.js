import { PRICE } from './GetPrice.action';

export const initialState = {
  price: {},
};

const priceReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRICE.GET:
      return Object.assign({}, state, {
        isLoading: true,
        error: false,
      });
    case PRICE.SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        price: action.price,
        error: false,
      });
    case PRICE.ERROR:
      return Object.assign({}, state, {
        isLoading: false,
        errorData: action.errData,
        error: true,
      });
    default:
      return state;
  }
};

export default priceReducer;
