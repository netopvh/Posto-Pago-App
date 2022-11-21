import {Attendant} from '../actions/actionTypes';

const initialState = {
  purchase: null,
  loading: false,
  purchaseConfirmLoading: false,
  purchaseError: null,
  purchaseConfirmed: false,
};

export default function attendantReducer(state = initialState, action) {
  switch (action.type) {
    case Attendant.REQUEST_GET_PURCHASE:
      return {...state, purchase: null, loading: true};
    case Attendant.GET_PURCHASE:
      return {purchase: action.payload, loading: false};
    case Attendant.STOP_REQUEST_PURCHASE:
      return {purchase: null, loading: false};
    case Attendant.REQUEST_CONFIRM_PURCHASE:
      return {
        ...state,
        purchaseConfirmLoading: true,
        purchaseConfirmed: false,
        purchaseError: null,
      };
    case Attendant.CONFIRM_PURCHASE:
      return {
        ...state,
        purchaseConfirmLoading: false,
        purchaseConfirmed: true,
        purchaseError: null,
      };
    case Attendant.STOP_CONFIRM_PURCHASE:
      return {
        ...state,
        purchaseConfirmLoading: false,
        purchaseConfirmed: false,
        purchaseError: null,
      };
    case Attendant.ERROR_CONFIRM_PURCHASE:
      return {
        ...state,
        purchaseConfirmLoading: false,
        purchaseConfirmed: false,
        purchaseError: action.payload,
      };
    default:
      return {...state};
  }
}
