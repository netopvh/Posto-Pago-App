import {Recharge} from './../actions/actionTypes';

const initialState = {
  amount: 0,
  recharged: false,
  payment_type: {},
};

export default function rechargeReducer(state = initialState, action) {
  switch (action.type) {
    case Recharge.DO_RECHARGE:
      return {
        ...state,
        amount: action.amount,
      };
    case Recharge.SET_RECHARGED:
      return {
        ...state,
        recharged: action.recharged,
      };
    case Recharge.SET_DONE:
      return {
        ...state,
        amount: 0,
        recharged: false,
        payment_type: {},
      };
    default:
      return state;
  }
}
