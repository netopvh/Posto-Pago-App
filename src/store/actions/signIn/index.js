import {Auth} from './../actionTypes';
import {authService} from './../../../services/auth';
import {checkGeneralErrors} from './../checkErros';
import {errorTypes} from './../../../utils/errorHandler/errorTypes';
import {
  flashErrorMessage,
  flashWarningMessage,
  flashInfoMessage,
  flashSuccessMessage,
} from './../flashMessages';
import {popFromQueue, pushToQueue} from './../asyncQueue';
import AsyncStorage from '@react-native-community/async-storage';

export const signInRequest = () => ({
  type: Auth.SIGN_IN_REQUEST,
});

export const signIn = () => ({
  type: Auth.SIGN_IN,
});

export const stopSigningIn = () => ({
  type: Auth.SIGN_IN_STOP,
});

export const signOut = () => ({
  type: Auth.SIGN_OUT,
});

export const getUserData = () => ({
  type: Auth.GET_USER_DATA,
});

export const setUserData = payload => ({
  type: Auth.SET_USER_DATA,
  payload,
});

export const stopUserData = () => ({
  type: Auth.STOP_USER_DATA,
});

export const updateUserData = payload => ({
  type: Auth.UPDATE_USER_DATA,
  payload,
});

export const updatedUserData = () => ({
  type: Auth.UPDATED_USER_DATA,
});

export const getToken = token => ({
  type: Auth.GET_TOKEN,
  token,
});

export const updateCredits = payload => ({
  type: Auth.UPDATE_CREDITS,
  payload,
});

export const updatePendingCredits = payload => ({
  type: Auth.UPDATE_PENDING_CREDITS,
  payload,
});

export const updateConsume = payload => ({
  type: Auth.UPDATE_CONSUME,
  payload,
});

export const signUpRequest = () => ({
  type: Auth.SIGN_UP_REQUEST,
});

export const stopSignUpRequest = () => ({
  type: Auth.STOP_SIGN_UP_REQUEST,
});

export const codeRequest = () => ({
  type: Auth.CODE_REQUEST,
});

export const codeSent = () => ({
  type: Auth.CODE_SENT,
});

export const codeRequestStop = () => ({
  type: Auth.CODE_REQUEST_STOP,
});

export function signInApiRequest(email, password) {
  return async function(dispatch) {
    try {
      if (!email && !password) {
        throw {type: 'CAMPOS_VAZIOS', err: 'LOGIN VAZIO'};
      }
      dispatch(signInRequest());
      const res = await authService.signIn(email, password);
      await AsyncStorage.setItem('@PostoPago:token', res.data.access_token);
      return dispatch(signIn());
    } catch (err) {
      dispatch(flashWarningMessage('Login ou senha inválidos'));
      return dispatch(stopSigningIn());
    }
  };
}

export function signOutApi(navigation) {
  return async function(dispatch) {
    try {
      const res = await authService.signOut();
      await AsyncStorage.removeItem('@PostoPago:token');
      dispatch(signOut());
      dispatch(flashInfoMessage('Usuário deslogado'));
      navigation.navigate('Auth');
      return res.data;
    } catch (err) {
      dispatch(popFromQueue());
      if (!checkGeneralErrors(dispatch, err)) {
        return dispatch(flashErrorMessage(err));
      }
      return false;
    }
  };
}

export function forceSignOutApi() {
  return async function(dispatch) {
    await authService.signOut();
    return dispatch(signOut());
  };
}

export function getUserDataApi(navigation) {
  return async function(dispatch) {
    dispatch(pushToQueue('Recebendo informações de usuário...'));
    dispatch(getUserData());
    try {
      const res = await authService.getUserData();
      dispatch(setUserData(res.data));
      return dispatch(popFromQueue());
    } catch (err) {
      await authService.bruteSignOut();
      //navigation.navigate('Auth');
      dispatch(popFromQueue());
      if (!checkGeneralErrors(dispatch, err)) {
        return dispatch(flashErrorMessage(err));
      }
      return false;
    }
  };
}

export function updateUserDataApi() {
  return async function(dispatch) {
    dispatch(pushToQueue('Atualizando informações...'));
    try {
      const res = await authService.getUserData();
      dispatch(updateUserData(res.data));
      dispatch(updatedUserData());
      return dispatch(popFromQueue());
    } catch (err) {
      dispatch(popFromQueue());
      if (!checkGeneralErrors(dispatch, err)) {
        return dispatch(flashErrorMessage(err));
      }
    }
  };
}

export function signUp(user, navigation, formikSetErrors) {
  return async function(dispatch) {
    dispatch(signUpRequest());
    dispatch(pushToQueue('Enviando dados para cadastro ...'));
    try {
      const res = await authService.singUp(user);
      await AsyncStorage.setItem('@PostoPago:token', res.data.access_token);
      dispatch(popFromQueue());
      dispatch(stopSignUpRequest());
      navigation.navigate('PhoneConfirm');
      return true;
    } catch (err) {
      if (err.response && err.type === 422) {
        formikSetErrors(err.response.data.errors);
      }
      dispatch(stopSignUpRequest());
      return false;
    }
  };
}

export function confirmPhoneNumber(code, navigation, setErrors) {
  return async function(dispatch) {
    dispatch(codeRequestStop());
    dispatch(signUpRequest());
    dispatch(pushToQueue('Confirmando código de SMS ...'));
    try {
      const res = await authService.confirmPhone(code);
      dispatch(stopSignUpRequest());
      navigation.navigate('Main');
      return true;
    } catch (err) {
      if (err.status === 400) {
        setErrors(err.data.message);
      }
      dispatch(popFromQueue());
      dispatch(stopSignUpRequest());
      return false;
    }
  };
}

export function resendCodeApi(setErrors) {
  return async function(dispatch) {
    try {
      dispatch(codeRequest());
      const res = await authService.resendCode();
      dispatch(codeSent());
    } catch (e) {
      setErrors(e.data.message);
    }
  };
}
