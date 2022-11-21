import api from '../api';
import errorHandler from './../../utils/errorHandler';
import AsyncStorage from '@react-native-community/async-storage';

const getPurchaseDetails = async id => {
  try {
    const token = await AsyncStorage.getItem('@PostoPago:token');
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    const res = await api.get(`/purchase/get/${id}`);
    return res.data;
  } catch (err) {
    throw errorHandler(err);
  }
};

const confirmPurchase = async id => {
  try {
    const token = await AsyncStorage.getItem('@PostoPago:token');
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    const res = await api.get(`/purchase/confirm/${id}`);
    return res.data;
  } catch (err) {
    throw errorHandler(err);
  }
};

const searchCustomer = async email => {
  try {
    const token = await AsyncStorage.getItem('@PostoPago:token');
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    const res = await api.get(`/customer/search/${email}`);
    return res.data;
  } catch (err) {
    throw errorHandler(err);
  }
};

const rechargeCustomer = async rechargeData => {
  try {
    const token = await AsyncStorage.getItem('@PostoPago:token');
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    const res = await api.post('/user/recharge_customer', rechargeData);
    return res.data;
  } catch (err) {
    throw errorHandler(err);
  }
};

export const attendantService = {
  getPurchaseDetails,
  confirmPurchase,
  searchCustomer,
  rechargeCustomer,
};
