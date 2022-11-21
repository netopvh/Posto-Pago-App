import api from './../api';
import errorHandler from './../../utils/errorHandler';
import AsyncStorage from '@react-native-community/async-storage';

const signIn = async (email, password) => {
  try {
    const res = await api.post('/auth', {email, password});
    if (res.data && res.data.access_token) {
      api.defaults.headers.common.Authorization = `${res.data.token_type} ${
        res.data.access_token
      }`;
      await AsyncStorage.setItem('@PostoPago:token', res.data.access_token);
    }
    return res;
  } catch (err) {
    throw errorHandler(err);
  }
};

const singUp = async user => {
  try {
    const res = await api.post('/signup', user);
    return res;
  } catch (err) {
    throw errorHandler(err);
  }
};

const confirmPhone = async code => {
  try {
    const token = await AsyncStorage.getItem('@PostoPago:token');
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    const res = await api.get('/phone_verify/' + code);
    return res.data;
  } catch (err) {
    throw err.response;
  }
};

const resendCode = async () => {
  try {
    const token = await AsyncStorage.getItem('@PostoPago:token');
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    const res = await api.get('/resend_code');
    return res.data;
  } catch (err) {
    throw err.response;
  }
};
const getUserData = async () => {
  try {
    const token = await AsyncStorage.getItem('@PostoPago:token');
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    const res = await api.get('/user');
    return res;
  } catch (err) {
    throw errorHandler(err);
  }
};
const signOut = async () => {
  try {
    const token = await AsyncStorage.getItem('@PostoPago:token');
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    const res = await api.get('/logout');
    return res;
  } catch (err) {
    throw errorHandler(err);
  }
};

const bruteSignOut = async () => {
  await AsyncStorage.clear();
};

const setRecharge = async amount => {
  try {
    const token = await AsyncStorage.getItem('@PostoPago:token');
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    const res = await api.post('/user/recharge', {amount});
    return res;
  } catch (err) {
    throw errorHandler(err);
  }
};

const setPurchase = async newPurchase => {
  try {
    const token = await AsyncStorage.getItem('@PostoPago:token');
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    const res = await api.post('/user/purchase', {
      amount: newPurchase.amount,
      company_id: newPurchase.company_id,
      fuel_id: newPurchase.fuel_id,
    });
    return res;
  } catch (err) {
    throw errorHandler(err);
  }
};

const getCompanies = async (page = 1) => {
  try {
    const token = await AsyncStorage.getItem('@PostoPago:token');
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    const res = await api.get(`/company/all?page=${page}`);
    return res;
  } catch (err) {
    throw errorHandler(err);
  }
};

const getPurchase = async purchase_code => {
  try {
    const token = await AsyncStorage.getItem('@PostoPago:token');
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    const res = await api.get('/user/purchase_get', {purchase_code});
    return res;
  } catch (err) {
    throw errorHandler(err);
  }
};

const cancelPurchase = async purchase_id => {
  try {
    const token = await AsyncStorage.getItem('@PostoPago:token');
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    const res = await api.post('/user/cancel_purchase', {purchase_id});
    return res;
  } catch (err) {
    throw errorHandler(err);
  }
};

export const authService = {
  signIn,
  singUp,
  signOut,
  getUserData,
  setRecharge,
  setPurchase,
  getCompanies,
  bruteSignOut,
  getPurchase,
  cancelPurchase,
  confirmPhone,
  resendCode,
};
