import {Attendant} from '../actionTypes';
import {checkGeneralErrors} from '../checkErros';
import {flashErrorMessage} from '../flashMessages';
import {attendantService} from '../../../services/attendant';

const getPurchase = payload => ({
  type: Attendant.GET_PURCHASE,
  payload,
});

const requestGetPurchase = () => ({
  type: Attendant.REQUEST_GET_PURCHASE,
});

const stopRequestPurchase = () => ({
  type: Attendant.STOP_REQUEST_PURCHASE,
});

const requestConfirmPurchase = () => ({
  type: Attendant.REQUEST_CONFIRM_PURCHASE,
});

const confirmPurchase = () => ({
  type: Attendant.CONFIRM_PURCHASE,
});

const confirmPurchaseError = payload => ({
  type: Attendant.ERROR_CONFIRM_PURCHASE,
  payload,
});

export const stopRequestConfirm = () => ({
  type: Attendant.STOP_CONFIRM_PURCHASE,
});

export function confirmPurchaseApi(id) {
  return async function(dispatch) {
    dispatch(requestConfirmPurchase());
    try {
      const res = await attendantService.confirmPurchase(id);
      if (res) {
        dispatch(confirmPurchase());
      } else {
        dispatch(confirmPurchaseError(res));
      }
    } catch (e) {
      if (!checkGeneralErrors(dispatch, e)) {
        dispatch(flashErrorMessage('Erro ao confirmar vendas'));
        return dispatch(stopRequestConfirm());
      }
    }
  };
}
export function getPurchaseApi(id) {
  return async function(dispatch) {
    dispatch(requestGetPurchase());
    try {
      const res = await attendantService.getPurchaseDetails(id);
      dispatch(getPurchase(res));
      return true;
    } catch (e) {
      if (!checkGeneralErrors(dispatch, e)) {
        dispatch(flashErrorMessage('Erro ao buscar informações de venda'));
        return dispatch(stopRequestPurchase());
      }
      return false;
    }
  };
}

export function searchCustomerApi(email, toggleLoading, setCustomer, setError) {
  return async function(dispatch) {
    toggleLoading();
    try {
      const res = await attendantService.searchCustomer(email);
      setCustomer(res);
      toggleLoading();
    } catch (e) {
      if (e.type === 404) {
        setError('Cliente não encontrado.');
      }
      toggleLoading();
    }
  };
}

export function rechargeCustomerApi(
  rechargeData,
  toggleLoading,
  setError,
  onSuccess,
) {
  return async function(dispatch) {
    toggleLoading();
    try {
      const res = await attendantService.rechargeCustomer(rechargeData);
      onSuccess(res);
      toggleLoading();
    } catch (e) {
      setError('Erro ao tentar recarregar, tente novamente.');
      toggleLoading();
    }
  };
}
