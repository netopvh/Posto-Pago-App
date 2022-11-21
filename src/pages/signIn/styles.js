import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  logo: {
    height: Dimensions.get('window').height * 0.2,
    marginVertical: 20,
    width: Dimensions.get('window').width * 0.7,
    alignSelf: 'center',
  },
  myButton: {
    fontSize: 30,
    margin: 5,
    padding: 15,
    justifyContent: 'center',
  },
  erro: {
    fontSize: 18,
    color: '#ff0000',
  },
});

export default styles;
