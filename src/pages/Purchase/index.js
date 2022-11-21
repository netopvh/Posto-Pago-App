import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';

import {submitPurchase, resetPurchase} from './../../store/actions/purchase';
import {
  Button,
  TextInput,
  Headline,
  Caption,
  Portal,
  Dialog,
  Surface,
} from 'react-native-paper';
import {MaskService} from 'react-native-masked-text';
import styles from './styles';
import CompanyList from './../../components/purchaseScreen/companyList';
import CompanySelected from './../../components/purchaseScreen/companySelected';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {flashMessageClose} from './../../store/actions/flashMessages';
import FlashMessage from './../../components/flashMessage';

function Purchase({
  submitPurchase,
  resetPurchase,
  credits,
  error,
  navigation,
  flashMessageClose,
  purchaseProp,
}) {
  const [amount, setAmount] = useState(0.0);
  const [fuel_qtd, setFuelQtd] = useState(0.0);
  const [limit, setLimit] = useState(credits);
  const [sale, setSale] = useState({
    amount: '',
    company: null,
    fuel: null,
  });
  const [buy, setBuy] = useState(null);

  useEffect(() => {
    setSale(purchaseProp);
  }, [purchaseProp]);

  let handleValues = (value, type) => {
    switch (type) {
      case 'AMOUNT': {
        let gas = parseFloat(MaskService.toRawValue('money', value));
        let liters = 0.0;
        liters = gas > 0 ? gas / sale.fuel.app_price : 0;
        setAmount(value);
        setFuelQtd(liters);
        credits - gas <= 0 ? setLimit(0) : setLimit(credits - gas);
        break;
      }
      case 'LITERS': {
        let gas = 0.0;
        let liters = parseFloat(
          MaskService.toRawValue('money', value, {
            unit: '',
            delimiter: '',
            precision: 3,
          }),
        );
        gas = liters > 0.0 ? liters * sale.fuel.app_price : 0;
        setAmount(gas);
        setFuelQtd(liters);
        break;
      }
    }
  };

  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{x: 0, y: 0}}
      contentContainerStyle={{flex: 1}}
      scrollEnabled={false}>
      <Surface style={styles.container}>
        <Surface style={styles.header}>
          <Headline>Realizar Compra</Headline>
          <Caption>
            Saldo Disponível:{' '}
            {MaskService.toMask('money', parseFloat(limit).toFixed(2))}
          </Caption>
        </Surface>
        {!sale.company && !sale.fuel ? <CompanyList /> : <CompanySelected />}
        <Surface style={styles.valuePanel}>
          <TextInput
            defaultValue="0"
            mode="outlined"
            style={styles.input}
            value={MaskService.toMask('money', amount)}
            error={limit <= 0}
            onChangeText={text => handleValues(text, 'AMOUNT')}
            label="Valor"
            keyboardType="decimal-pad"
            disabled={!sale.company || !sale.fuel}
            selectTextOnFocus={true}
          />
          <TextInput
            mode="outlined"
            defaultValue="1"
            error={limit <= 0}
            style={styles.input}
            value={MaskService.toMask('money', fuel_qtd, {
              unit: '',
              delimiter: '',
              precision: 3,
            })}
            onChangeText={text => handleValues(text, 'LITERS')}
            label="Litros"
            keyboardType="decimal-pad"
            disabled={!sale || !sale.fuel}
            selectTextOnFocus={true}
          />
        </Surface>
        <FlashMessage
          open={limit <= 0 && credits > 0}
          message="Saldo Insuficiente"
          nextPage=""
          type="error"
        />

        <Surface style={styles.buttonPanel}>
          <Button
            loading={sale.loading}
            mode="contained"
            style={styles.input}
            onPress={async () => {
              setBuy(
                await submitPurchase({
                  amount: MaskService.toRawValue('money', amount),
                  company_id: sale.company.id,
                  fuel_id: sale.fuel.id,
                }),
              );
            }}
            disabled={!fuel_qtd || !amount || sale.loading || limit <= 0}>
            Comprar
          </Button>
          <Button
            style={styles.input}
            mode="contained"
            onPress={() => {
              resetPurchase();
              navigation.navigate('Main');
            }}>
            Cancelar
          </Button>
        </Surface>
      </Surface>
      <FlashMessage
        open={error.open && error.type === 'error'}
        message={error.message}
        type={error.type}
        nextPage={''}
      />

      <Portal>
        <Dialog
          visible={error.open && error.type === 'success'}
          onDismiss={() => {}}>
          <Dialog.Title>Sucesso</Dialog.Title>
          <Dialog.Content>
            <Caption>Compra Realizada com sucesso</Caption>
          </Dialog.Content>
          <Dialog.Actions style={styles.dialogButtons}>
            <Button
              mode="contained"
              onPress={() => {
                flashMessageClose();
                navigation.navigate('ViewQrCode', {
                  purchase: buy,
                });
              }}>
              Visualizar
            </Button>
            <Button
              mode="contained"
              onPress={() => {
                flashMessageClose();
                resetPurchase();
                navigation.navigate('Main');
              }}>
              Ver Depois
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </KeyboardAwareScrollView>
  );
}

const mapStateToProps = state => ({
  credits: state.authReducer.user.info.balance.credits,
  error: state.flashMessageReducer,
  purchaseProp: state.purchaseReducer,
});

const mapDispatchToProps = dispatch => ({
  submitPurchase: newPurchase => dispatch(submitPurchase(newPurchase)),
  resetPurchase: () => dispatch(resetPurchase()),
  flashMessageClose: () => dispatch(flashMessageClose()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Purchase);
