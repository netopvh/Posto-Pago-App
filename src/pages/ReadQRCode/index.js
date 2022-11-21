import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {Surface, Text} from 'react-native-paper';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {withNavigation, withNavigationFocus} from 'react-navigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },

  touchable: {
    padding: 16,
  },

  text: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },

  cameraContainer: {
    height: Dimensions.get('window').height,
  },
});

const ReadQRCode = ({navigation}) => {
  return (
    <Surface style={styles.container}>
      {navigation.isFocused() ? (
        <QRCodeScanner
          reactivate={true}
          onRead={async e => {
            await navigation.navigate('confirmPurchase', {id: e.data});
          }}
          showMarker={true}
          checkAndroid6Permissions={true}
          cameraStyle={styles.cameraContainer}
          bottomContent={
            <Surface style={styles.touchable}>
              <Text>Aponte para o Código QR</Text>
            </Surface>
          }
        />
      ) : (
        <Surface />
      )}
    </Surface>
  );
};

export default withNavigationFocus(ReadQRCode);
