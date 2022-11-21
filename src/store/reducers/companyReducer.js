import {Company} from './../actions/actionTypes';

const initialState = {
  isEmpty: true,
  isLoading: false,
  companies: {
    company: {
      id: '',
      name: '',
      fuelList: {
        id: '',
        name: '',
        shop_price: '',
        app_price: '',
      },
    },
  },
};

export default function companyReducer(state = initialState, action) {
  switch (action.type) {
    case Company.GET_ALL:
      return {
        ...state,
        isLoading: false,
        isEmpty: false,
        companies: action.payload,
      };
    case Company.REQUEST_COMPANIES:
      return {
        ...state,
        isLoading: true,
        isEmpty: false,
      };
    case Company.CLEAR:
      return {
        ...initialState,
      };
    case Company.STOP_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
