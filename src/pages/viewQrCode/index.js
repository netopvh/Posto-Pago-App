import React from 'react';
import {Headline, Card, Button, Caption, Surface} from 'react-native-paper';
import {connect} from 'react-redux';
import QrCode from 'react-native-qrcode-svg';
import styles from './styles';

const ViewQrCode = props => {
  const {purchase} = props.navigation.state.params;

  return (
    <Surface style={styles.container}>
      <Headline style={styles.header}>
        Apresente este código para o frentista
      </Headline>
      <Card style={styles.panel}>
        <Card.Content style={styles.qrcode}>
          <QrCode size={250} value={purchase.purchase_code} />
          <Surface style={styles.footer}>
            <Caption style={styles.infoText}>Posto: {purchase.company}</Caption>
            <Caption style={styles.infoText}>
              Combustível: {purchase.fuel_name}
            </Caption>
          </Surface>
        </Card.Content>
        <Card.Actions>
          <Button
            mode="contained"
            icon="arrow-back"
            onPress={() => props.navigation.goBack()}>
            Voltar
          </Button>
        </Card.Actions>
      </Card>
    </Surface>
  );
};

const mapStateToProps = state => ({
  state,
});

export default connect(mapStateToProps)(ViewQrCode);
