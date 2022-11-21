import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    padding: 10,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: 10,
  },
  header: {
    fontWeight: 'bold',
  },
  btnLarge: {
    padding: 60,
    marginTop: 10,
  },
  btn: {
    margin: 5,
    padding: 5,
    marginBottom: 25,
  },
});

export default styles;
