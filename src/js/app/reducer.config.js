import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import configReducer from '../components/store/get-config/GetConfig.reducer';
import createPolicyholderReducer from '../components/store/create-policy-holder/CreatePolicyholder.reducer';
import createPolicyReducer from '../components/store/create-policy/CreatePolicy.reducer';
import priceReducer from '../components/store/get-price/GetPrice.reducer';
import producerDetailsReducer from '../components/store/get-producer-details/GetProducerDetails.reducer';
import exposureReducer from '../components/store/exposures/Exposure.reducer';


const reducers = combineReducers({
  routing: routerReducer,
  form: formReducer,
  configState: configReducer,
  policyholderState: createPolicyholderReducer,
  policyState: createPolicyReducer,
  producerDetailsState: producerDetailsReducer,
  priceState: priceReducer,
  exposureState: exposureReducer,
});

export default reducers;
