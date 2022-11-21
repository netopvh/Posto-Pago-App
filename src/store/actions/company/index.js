import {Company} from './../actionTypes';
import {authService} from './../../../services/auth';
import {popFromQueue, pushToQueue} from './../asyncQueue';
import {checkGeneralErrors} from './../checkErros';
import {errorTypes} from './../../../utils/errorHandler/errorTypes';
import {
  flashErrorMessage,
  flashInfoMessage,
  flashSuccessMessage,
  flashWarningMessage,
} from './../flashMessages';

export const getAll = payload => ({
  type: Company.GET_ALL,
  payload,
});

export const requestCompanies = () => ({
  type: Company.REQUEST_COMPANIES,
});

export const clearCompanies = () => ({
  type: Company.CLEAR,
});

const stopLoading = () => ({
  type: Company.STOP_LOADING,
});

export function getCompanies(page) {
  return async function(dispatch) {
    dispatch(pushToQueue('Coletando dados ...'));
    dispatch(requestCompanies());
    try {
      const res = await authService.getCompanies((page = 1));
      dispatch(popFromQueue());
      return res.data.data;
    } catch (err) {
      dispatch(popFromQueue());
      if (checkGeneralErrors(dispatch, err)) {
        flashErrorMessage(err);
      }
      dispatch(stopLoading());
    }
  };
}
