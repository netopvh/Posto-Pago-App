import {Purchase} from './../actionTypes';
import {authService} from './../../../services/auth';
import {popFromQueue, pushToQueue} from './../asyncQueue';
import {checkGeneralErrors} from './../checkErros';
import {errorTypes} from './../../../utils/errorHandler/errorTypes';
import {
  flashErrorMessage,
  flashInfoMessage,
  flashSuccessMessage,
} from './../flashMessages';
import {updateCredits, getUserDataApi} from './../signIn';

export const resetPurchase = () => ({
  type: Purchase.RESET_PURCHASE,
});

export const setCompany = (company, fuel) => ({
  type: Purchase.SET_COMPANY,
  company,
  fuel,
});

export const setValue = payload => ({
  type: Purchase.SET_AMOUNT,
  payload,
});

export const returnPurchase = payload => ({
  type: 'RESPONSE_PURCHASE',
  payload,
});

export const setLoading = () => ({
  type: Purchase.SET_LOADING,
});

export const stopLoading = () => ({
  type: Purchase.STOP_LOADING,
});

export const cancelledPurchase = purchase_id => ({
  type: 'PURCHASE_CANCELLED',
  purchase_id,
});

export function submitPurchase(newPurchase) {
  return async function(dispatch) {
    try {
      dispatch(setLoading());
      await dispatch(setValue(newPurchase.amount));
      dispatch(pushToQueue('Realizando compra'));
      const res = await authService.setPurchase(newPurchase);
      dispatch(updateCredits(newPurchase.amount * -1));
      dispatch(resetPurchase());
      dispatch(returnPurchase(res.data));
      dispatch(flashSuccessMessage('Compra realizada com sucesso.'));
      dispatch(popFromQueue());
      return res.data;
    } catch (err) {
      dispatch(stopLoading());
      dispatch(popFromQueue());
      if (checkGeneralErrors(dispatch, err)) {
        dispatch(flashErrorMessage(err.response));
      }
    }
  };
}

export function cancelPurchase(purchase_id) {
  return async function(dispatch) {
    try {
      dispatch(pushToQueue('Realizando cancelamento'));
      const res = await authService.cancelPurchase(purchase_id);
      //dispatch(flashSuccessMessage('Cancelado com sucesso.'));
      dispatch(popFromQueue());
      dispatch(getUserDataApi());
      return res.data;
    } catch (err) {
      dispatch(popFromQueue());
      if (checkGeneralErrors(dispatch, err)) {
        dispatch(flashErrorMessage(err.response.response));
      }
      dispatch(stopLoading());
    }
  };
}
