import {Recharge} from './../actionTypes';
import {authService} from './../../../services/auth';
import {popFromQueue, pushToQueue} from './../asyncQueue';
import {checkGeneralErrors} from './../checkErros';
import {errorTypes} from './../../../utils/errorHandler/errorTypes';
import {
  flashErrorMessage,
  flashInfoMessage,
  flashSuccessMessage,
} from './../flashMessages';
import {updatePendingCredits} from '../signIn';

export const doRecharge = amount => ({
  type: Recharge.DO_RECHARGE,
  amount,
});

export const rechargeResult = recharged => ({
  type: Recharge.SET_RECHARGED,
  recharged,
});

export const finalizeRecharge = () => ({
  type: Recharge.SET_DONE,
});

export function submitRecharge(amount) {
  return async function(dispatch) {
    try {
      dispatch(pushToQueue('Realizando Recarga, Aguarde ...'));
      const res = await authService.setRecharge(amount);
      dispatch(doRecharge(amount));
      dispatch(rechargeResult(res.data));
      dispatch(updatePendingCredits(parseFloat(amount)));
      dispatch(flashSuccessMessage('Recarga Realizada com sucesso.'));
      dispatch(finalizeRecharge());
      dispatch(popFromQueue());
      return res;
    } catch (err) {
      dispatch(popFromQueue());
      if (!checkGeneralErrors(dispatch, err)) {
        return dispatch(flashErrorMessage(err));
      }
    }
  };
}
