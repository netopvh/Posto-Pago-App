import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    alignContent: 'center',
    justifyContent: 'center',
  },
  qrcode: {
    alignItems: 'center',
  },
  header: {
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  footer: {
    margin: 2,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  infoText: {},
  panel: {
    alignItems: 'stretch',
    padding: 10,
  },
});

export default styles;
