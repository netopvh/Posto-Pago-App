import axios from 'axios';

//import AsyncStorage from '@react-native-community/async-storage';
//const token = async () => await AsyncStorage.getItem('@PostoPago:token');

export default axios.create({
  //baseURL: 'http://192.168.1.104/api/',
  //baseURL: 'https://posto-pagoo.herokuapp.com/api/',
  baseURL: 'https://api.postopago.com.br/',
  headers: {
    common: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  },
});
