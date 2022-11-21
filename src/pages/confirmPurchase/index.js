import React from 'react';
import {Text, Surface} from 'react-native-paper';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';

import PurchaseDetails from './PurchaseDetails';
import {
  getPurchaseApi,
  confirmPurchaseApi,
  stopRequestConfirm,
} from '../../store/actions/attendantActions';

class ConfirmPurchase extends React.Component {
  componentDidMount() {
    const purchaseId = this.props.navigation.getParam('id', null);
    this.props.dispatch(getPurchaseApi(purchaseId));
  }

  confirmPurchase = id => {
    this.props.dispatch(confirmPurchaseApi(id));
  };

  handleConfirmed = () => {
    this.props.dispatch(stopRequestConfirm());
    this.props.navigation.navigate('Main');
  };
  render() {
    const {attendantState, navigation, dispatch} = this.props;
    if (attendantState.loading) {
      return <Text>Carregando...</Text>;
    } else {
      return attendantState.purchase ? (
        <PurchaseDetails
          purchaseDetails={attendantState.purchase}
          confirmPurchase={this.confirmPurchase}
          loading={attendantState.purchaseConfirmLoading}
          confirmed={attendantState.purchaseConfirmed}
          onClose={this.handleConfirmed}
        />
      ) : (
        <Surface>
          <Text>Venda inválida</Text>
        </Surface>
      );
    }
  }
}

const mapStateToProps = state => ({
  authState: state.authReducer,
  attendantState: state.attendantReducer,
});

export default connect(mapStateToProps)(withNavigation(ConfirmPurchase));
