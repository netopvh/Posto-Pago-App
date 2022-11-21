import {Auth} from './actionTypes';

export function setPhoneNumber(phoneNumber) {
  return {
    type: Auth.SET_USER_PHONE,
  };
}
