import {StyleSheet} from 'react-native';
import {Colors} from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
  },
  valuePanel: {
    flexDirection: 'row',
    margin: 10,
  },
  input: {
    flex: 1,
    margin: 5,
  },
  header: {
    marginTop: 10,
    marginBottom: 5,
    alignItems: 'center',
  },
  buttonPanel: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  dialogButtons: {
    justifyContent: 'space-around',
  },
  limit: {
    color: `${Colors.red800}`,
    alignSelf: 'center',
  },
});

export default styles;
