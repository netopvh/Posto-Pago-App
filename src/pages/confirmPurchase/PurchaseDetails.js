import React from 'react';
import {MaskService} from 'react-native-masked-text';
import {Headline, Button, Text, Snackbar, Surface} from 'react-native-paper';

import styles from './styles';
import InfoInline from '../../utils/components/InfoInline';

const PurchaseDetails = ({
  purchaseDetails,
  confirmPurchase,
  loading,
  confirmed,
  onClose,
}) => {
  return (
    <Surface style={styles.root}>
      <Surface style={styles.wrapContainer}>
        <Headline style={styles.title}>confirmar venda</Headline>
      </Surface>
      <Surface style={styles.wrapContainer}>
        <Headline>Informações do cliente</Headline>
      </Surface>
      <InfoInline
        label="Nome: "
        value={purchaseDetails.user.name}
        textSize={15}
      />
      <InfoInline
        label="Email: "
        value={purchaseDetails.user.email}
        textSize={15}
      />
      <Surface style={styles.wrapContainer}>
        <Headline>Informações da compra</Headline>
      </Surface>
      <InfoInline
        label="Combustível: "
        value={purchaseDetails.fuel_name}
        textSize={15}
      />
      <InfoInline
        label="Preço litro: "
        value={MaskService.toMask('money', purchaseDetails.fuel_price)}
        textSize={15}
      />
      <InfoInline
        label="Valor gasto: "
        value={MaskService.toMask('money', purchaseDetails.amount)}
        textSize={15}
      />
      <Surface style={styles.wrapContainer}>
        <Button
          mode="outlined"
          labelStyle={styles.btn}
          onPress={() => confirmPurchase(purchaseDetails.purchase_code)}
          disabled={loading}
          loading={loading}>
          Confirmar venda
        </Button>
      </Surface>
      <Snackbar
        visible={confirmed}
        onDismiss={() => onClose()}
        duration={Snackbar.DURATION_SHORT}
        action={{
          label: 'OK',
          onPress: () => {
            onClose();
          },
        }}>
        Venda confirmada
      </Snackbar>
    </Surface>
  );
};

export default PurchaseDetails;
