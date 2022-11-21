import React from 'react';
import {connect} from 'react-redux';
import styles from './styles';
import {Text, Headline, Button, TextInput, Surface} from 'react-native-paper';
import CustomerSearchForm from './CustomerSearchForm';
import CustomerDetails from './CustomerDetails';
import {
  searchCustomerApi,
  rechargeCustomerApi,
} from '../../store/actions/attendantActions';
import FlashMessage from '../../components/flashMessage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {MaskService} from 'react-native-masked-text';
import {withNavigation} from 'react-navigation';

class UserRecharge extends React.Component {
  state = {
    success: null,
    rechargeLoading: false,
    amount: 0,
    loading: false,
    customer: null,
    error: null,
    rechargeError: null,
  };

  reset = () => {
    this.setState({
      rechargeLoading: false,
      loading: false,
      customer: null,
      amount: 0,
      error: null,
      rechargeError: null,
    });
  };

  setRechargeError = rechargeError => {
    this.setState({rechargeError});
  };

  setError = error => {
    this.setState({error});
  };

  setAmount = value => {
    this.setState({amount: value});
  };

  setCustomer = customer => {
    this.setState({customer});
  };

  toggleLoading = () => {
    this.setState({loading: !this.state.loading});
  };

  toggleRechargeLoading = () => {
    this.setState({rechargeLoading: !this.state.rechargeLoading});
  };

  searchCustomer = search => {
    this.reset();
    this.props.dispatch(
      searchCustomerApi(
        search,
        this.toggleLoading,
        this.setCustomer,
        this.setError,
      ),
    );
  };

  sendRecharge = () => {
    this.setState({rechargeError: null});
    const rechargeData = {
      customerId: this.state.customer.id,
      amount: MaskService.toRawValue('money', this.state.amount),
    };
    this.props.dispatch(
      rechargeCustomerApi(
        rechargeData,
        this.toggleRechargeLoading,
        this.setRechargeError,
        this.rechargeOk,
      ),
    );
  };

  rechargeOk = res => {
    this.setState({success: 'Créditos recarregados com sucesso.'});
  };

  render() {
    const {authState, navigation} = this.props;
    return (
      <KeyboardAwareScrollView
        resetScrollToCoords={{x: 0, y: 0}}
        contentContainerStyle={styles.container}
        scrollEnabled={false}>
        <Surface style={styles.rootContainer}>
          <Headline style={styles.title}>Realizar recarga</Headline>
          {!this.state.customer ? (
            <>
              <CustomerSearchForm
                searchCustomer={this.searchCustomer}
                loading={this.state.loading}
                customer={this.state.customer}
              />
              <Button style={{margin: 20}} onPress={() => navigation.goBack()}>
                Voltar
              </Button>
            </>
          ) : (
            <Button
              onPress={this.reset}
              disabled={this.state.rechargeLoading || this.state.success}>
              Buscar outro cliente
            </Button>
          )}
          {this.state.error ? (
            <Surface style={styles.loadingContainer}>
              <Text>{this.state.error}</Text>
            </Surface>
          ) : (
            <Surface />
          )}
          {this.state.loading ? (
            <Surface style={styles.loadingContainer}>
              <Text>Carregando informações...</Text>
            </Surface>
          ) : (
            <Surface />
          )}
          {this.state.customer && !this.state.loading ? (
            <Surface>
              <CustomerDetails details={this.state.customer} />
              <TextInput
                disabled={this.state.rechargeLoading || this.state.success}
                style={styles.input}
                mode="outlined"
                label="Valor da recarga"
                value={MaskService.toMask('money', this.state.amount)}
                onChangeText={text => this.setAmount(text)}
                selectTextOnFocus
                keyboardType="number-pad"
              />
              {this.state.rechargeError ? (
                <Text>{this.state.rechargeError}</Text>
              ) : (
                <></>
              )}
              <Surface style={styles.rechargeBtnContainer}>
                <Button
                  mode="contained"
                  icon="check-circle"
                  disabled={
                    this.state.rechargeLoading ||
                    !this.state.amount ||
                    this.state.success
                  }
                  loading={this.state.rechargeLoading}
                  onPress={this.sendRecharge}>
                  Confirmar
                </Button>
                <Button onPress={() => navigation.goBack()}>Cancelar</Button>
              </Surface>
            </Surface>
          ) : (
            <Surface />
          )}
          <FlashMessage
            open={this.state.error}
            message={this.state.error}
            type={'error'}
            nextPage={''}
          />
          <FlashMessage
            open={this.state.success}
            message={this.state.success}
            type={'success'}
            nextPage={'Main'}
          />
        </Surface>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = state => ({
  authState: state.authReducer,
});
export default connect(mapStateToProps)(withNavigation(UserRecharge));
