import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Button, TextInput, Text, Surface} from 'react-native-paper';
import {submitRecharge} from './../../store/actions/recharge';
import styles from './styles';
import FlashMessage from './../../components/flashMessage';

const Recharge = ({recharge, submitRecharge, error, navigation}) => {
  const [amount, setAmount] = useState('');

  return (
    <Surface style={styles.container}>
      <Text style={styles.header}> Digite um valor para recarregar </Text>
      <TextInput
        mode="outlined"
        value={amount}
        onChangeText={text => setAmount(text)}
      />
      <Button
        mode="contained"
        style={styles.btn}
        loading={false}
        onPress={() => submitRecharge(amount)}>
        Recarregar
      </Button>
      <Button
        mode="contained"
        style={styles.btn}
        icon=""
        onPress={() => navigation.goBack()}>
        Cancelar
      </Button>
      <FlashMessage
        open={error.open}
        type={error.type}
        message={error.message}
        nextPage={error.type === 'success' ? 'Main' : ''}
      />
    </Surface>
  );
};

const mapStateToProps = state => ({
  recharge: state.rechargeReducer,
  error: state.flashMessageReducer,
});

const mapDispatchToProps = dispatch => ({
  submitRecharge: amount => dispatch(submitRecharge(amount)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Recharge);
