import {User} from './../actions/actionTypes';

const initialState = {
  user: {
    isLoading: false,
    isEmpty: true,
    info: {},
  },
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case User.UPDATE_USER_DATA:
      return {
        ...state,
        user: {
          ...state.user,
          isLoading: true,
          info: action.payload,
        },
      };
  }
}
