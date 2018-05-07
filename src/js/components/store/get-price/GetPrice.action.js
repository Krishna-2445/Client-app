import axios from 'axios';

export const PRICE = {
  GET: 'PRICE_GET',
  SUCCESS: 'PRICE_SUCCESS',
  ERROR: 'PRICE_ERROR',
};
export const successPrice = price => ({
  type: PRICE.SUCCESS,
  price,
});

export const errorPrice = json => ({
  type: PRICE.ERROR,
  errData: json,
});

const priceDetailsObj = {
  price: '1000',
};


export const getPrice = () => (
  (dispatch) => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      return dispatch(successPrice(priceDetailsObj));
    }

    return axios.get('http://localhost:8079/mob_socotra_poc/price').done((response) => {
      dispatch(successPrice(response));
    }).catch((error) => {
      dispatch(errorPrice(error));
    });
  }
);

