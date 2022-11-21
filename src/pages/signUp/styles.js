import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  container: {
    margin: 5,
  },
  logo: {
    alignItems: 'stretch',
    height: Dimensions.get('window').height * 0.11,
    width: Dimensions.get('window').width * 0.6,
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btnPanel: {
    justifyContent: 'space-around',
  },
  btn: {
    height: 80,
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default styles;
