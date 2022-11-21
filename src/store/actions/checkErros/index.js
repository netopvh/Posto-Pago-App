import {flashErrorMessage} from './../flashMessages';
import {errorTypes} from './../../../utils/errorHandler/errorTypes';
import {forceSignOutApi, stopSigningIn} from './../signIn';

export const checkGeneralErrors = (dispatch, error) => {
  if (!error) {
    return null;
  }
  switch (error.type) {
    case errorTypes.UNAUTHORIZED:
      return 'Sessão expirada. Faça login novamente.';
    case errorTypes.NETWORK:
      dispatch(stopSigningIn());
      dispatch(
        flashErrorMessage('Não foi possível comunicar-se com o servidor.'),
      );
      return true;
    case errorTypes.SERVER_ERROR:
      //dispatch(flashErrorMessage(error.response));
      return 'Erro no interno do servidor (500)';
    case errorTypes.WRONG_METHOD:
      return 'Erro de processamento de informações. (405)';
    case errorTypes.VALIDATION:
      return 'Erro de validação do dados fornecidos. (422)';
    case errorTypes.BAD_REQUEST:
      return error.response;
    default:
      return false;
  }
};
