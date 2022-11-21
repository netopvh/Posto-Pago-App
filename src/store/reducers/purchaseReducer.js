import {Purchase} from './../actions/actionTypes';

const initialState = {
  amount: '',
  company: null,
  fuel: null,
  loading: false,
};

export default function purchaseReducer(state = initialState, action) {
  switch (action.type) {
    case Purchase.RESET_PURCHASE:
      return {
        ...initialState,
      };
    case Purchase.SET_COMPANY:
      return {
        ...state,
        company: action.company,
        fuel: action.fuel,
      };
    case Purchase.SET_AMOUNT:
      return {
        ...state,
        amount: action.payload,
      };
    case 'RESPONSE_PURCHASE':
      return {
        ...state,
        response: action.payload,
      };
    case Purchase.SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case Purchase.STOP_LOADING:
      return {
        ...state,
        loading: false,
      };
    case 'PURCHASE_CANCELLED':
      return {
        ...state,
        user: {
          ...state.user,
          info: {
            ...state.user.info,
            history: {
              ...state.user.info.history,
              purchases: {
                ...state.user.info.history.purchases,
                purchases: state.user.info.history.purchases.map(purchase => {
                  if (purchase.id === action.purchase_id) {
                    return {
                      ...purchase,
                      purchase_code: '',
                      cancelled: 0,
                    };
                  } else {
                    return purchase;
                  }
                }),
              },
            },
          },
        },
      };
    default:
      return state;
  }
}
