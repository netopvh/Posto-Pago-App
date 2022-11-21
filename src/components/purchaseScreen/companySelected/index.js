import React from 'react';
import {View} from 'react-native';
import {Title, Headline, Subheading, Surface} from 'react-native-paper';
import {connect} from 'react-redux';
import {MaskService} from 'react-native-masked-text';
import styles from './styles';
import InfoInline from '../../../utils/components/InfoInline';

const CompanySelected = ({purchase}) => (
  <Surface style={styles.container}>
    <InfoInline label="Empresa: " value={purchase.company.name} textSize={18} />
    <InfoInline
      label="Combustível: "
      value={purchase.fuel.name}
      textSize={18}
    />
    <InfoInline
      label="Preço no app: "
      value={MaskService.toMask(
        'money',
        parseFloat(purchase.fuel.app_price).toFixed(2),
      )}
      textSize={18}
    />
    <InfoInline
      label="Preço no posto: "
      value={MaskService.toMask(
        'money',
        parseFloat(purchase.fuel.shop_price).toFixed(2),
      )}
      textSize={18}
    />
  </Surface>
);

const mapStateToProps = state => ({
  purchase: state.purchaseReducer,
});

// const mapDispatchToProps = dispatch =>
//   bindActionCreators(Actions, dispatch);

export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(CompanySelected);
