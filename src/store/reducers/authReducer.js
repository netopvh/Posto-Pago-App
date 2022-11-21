import {Auth} from './../actions/actionTypes';

const initialState = {
  signedIn: false,
  signedOut: false,
  signingIn: false,
  user: {
    isLoading: false,
    isEmpty: true,
    info: {},
  },
  errors: null,
  signUpLoading: false,
  codeLoading: false,
  codeSent: false,
  menu: [],
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case Auth.SIGN_IN_REQUEST:
      return {
        ...state,
        signingIn: true,
        signedOut: false,
      };

    case Auth.SIGN_IN:
      return {
        ...state,
        signingIn: false,
        signedIn: true,
      };
    case Auth.SIGN_OUT:
      return {
        ...initialState,
        signedIn: false,
        signedOut: true,
        user: {
          isLoading: false,
          isEmpty: true,
          info: {},
        },
      };
    case Auth.SIGN_IN_STOP:
      return {...initialState, signedIn: false};
    case Auth.GET_USER_DATA:
      return {
        ...state,
        user: {
          isEmpty: false,
          isLoading: true,
        },
      };
    case Auth.SET_ERRORS:
      return {
        ...state,
        errors: action.payload,
      };
    case Auth.RESET_ERRORS:
      return {
        ...state,
        errors: null,
      };
    case Auth.SIGN_UP_REQUEST:
      return {
        ...state,
        signUpLoading: true,
      };
    case Auth.STOP_SIGN_UP_REQUEST:
      return {
        ...state,
        signUpLoading: false,
      };
    case Auth.CODE_REQUEST:
      return {
        ...state,
        codeLoading: true,
        codeSent: false,
      };
    case Auth.CODE_SENT:
      return {
        ...state,
        codeLoading: false,
        codeSent: true,
      };
    case Auth.CODE_REQUEST_STOP:
      return {
        ...state,
        codeLoading: false,
        codeSent: false,
      };
    case Auth.SET_USER_DATA:
      return {
        ...state,
        user: {
          isEmpty: false,
          isLoading: false,
          info: action.payload,
        },
      };
    case Auth.STOP_USER_DATA:
      return {
        ...state,
        user: {
          isEmpty: true,
          isLoading: false,
          info: {},
        },
      };
    case Auth.SET_USER_PHONE:
      return {
        ...state,
        user: {
          ...state.user,
          phoneNumber: action.payload,
        },
      };
    case Auth.GET_TOKEN:
      return {
        ...state,
        signedIn: action.token ? true : false,
      };
    case Auth.UPDATE_USER_DATA:
      return {
        ...state,
        user: {
          ...state.user,
          isLoading: true,
          info: action.payload,
        },
      };
    case Auth.UPDATED_USER_DATA:
      return {
        ...state,
        user: {
          ...state.user,
          isLoading: false,
        },
      };
    case Auth.UPDATE_CREDITS:
      return {
        ...state,
        user: {
          ...state.user,
          info: {
            ...state.user.info,
            balance: {
              ...state.user.info.balance,
              credits:
                parseFloat(state.user.info.balance.credits) + action.payload,
            },
          },
        },
      };
    case Auth.UPDATE_PENDING_CREDITS:
      return {
        ...state,
        user: {
          ...state.user,
          info: {
            ...state.user.info,
            balance: {
              ...state.user.info.balance,
              credits:
                parseFloat(state.user.info.balance.pending_credits) +
                action.payload,
            },
          },
        },
      };
    default:
      return state;
  }
}
