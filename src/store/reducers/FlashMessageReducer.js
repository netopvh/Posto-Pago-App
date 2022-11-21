import {FlashMessage} from './../actions/actionTypes.js';

const initialState = {
  open: false,
  message: '',
  type: 'info',
};

const flashMessageReducer = (state = initialState, action) => {
  switch (action.type) {
    case FlashMessage.INFO:
      return {
        ...state,
        open: true,
        message: action.message,
        type: 'info',
      };
    case FlashMessage.ERROR:
      return {
        ...state,
        open: true,
        message: action.message,
        type: 'error',
      };
    case FlashMessage.WARNING:
      return {
        ...state,
        open: true,
        message: action.message,
        type: 'warning',
      };
    case FlashMessage.SUCCESS:
      return {
        ...state,
        open: true,
        message: action.message,
        type: 'success',
      };
    case FlashMessage.CLOSE:
      return {
        ...state,
        open: false,
        message: '',
        type: 'info',
      };
    default:
      return state;
  }
};

export default flashMessageReducer;
