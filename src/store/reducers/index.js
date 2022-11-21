import {combineReducers} from 'redux';

import authReducer from './authReducer';
import flashMessageReducer from './FlashMessageReducer';
import asyncQueueReducer from './asyncQueueReducer';
import purchaseReducer from './purchaseReducer';
import rechargeReducer from './rechargeReducer';
import companyReducer from './companyReducer';
import attendantReducer from './attendantReducer';

const Reducers = combineReducers({
  authReducer,
  flashMessageReducer,
  asyncQueueReducer,
  purchaseReducer,
  rechargeReducer,
  companyReducer,
  attendantReducer,
});
export default Reducers;
