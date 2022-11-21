import React from 'react';
import {Button, Headline, Surface} from 'react-native-paper';
import {connect} from 'react-redux';
import {signOutApi} from '../../store/actions/signIn';
import {withNavigation} from 'react-navigation';

import styles from './styles';

const attendentScreen = ({signOutApi, navigation}) => (
  <Surface style={styles.mainContainer}>
    <Headline style={styles.title}>Atendimento</Headline>
    <Surface style={styles.btnContainer}>
      <Button
        mode="contained"
        style={styles.btn}
        labelStyle={{size: 30}}
        onPress={() => navigation.navigate('ReadQRCode')}>
        Ler QRCode
      </Button>
      <Button
        mode="contained"
        style={styles.btn}
        onPress={() => navigation.navigate('UserRecharge')}>
        Realizar recarga
      </Button>
    </Surface>
    <Surface style={{flex: 1}} />
    <Surface style={styles.btnContainer}>
      <Button
        icon="exit-to-app"
        style={styles.btn}
        mode="contained"
        onPress={() => signOutApi(navigation)}>
        Sair
      </Button>
    </Surface>
  </Surface>
);

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  signOutApi: navigation => dispatch(signOutApi(navigation)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(attendentScreen));
