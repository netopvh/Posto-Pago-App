import {StyleSheet} from 'react-native';
import {Colors} from 'react-native-paper';

const styles = StyleSheet.create({
  error: {
    backgroundColor: `${Colors.red900}`,
  },
  info: {
    backgroundColor: `${Colors.cyan600}`,
  },
  warning: {
    backgroundColor: `${Colors.yellow600}`,
  },
  default: {
    backgroundColor: `${Colors.white}`,
  },
  success: {
    backgroundColor: `${Colors.green300}`,
  },
  caption: {
    color: `${Colors.white}`,
  },
  toast: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 50,
  },
});

export default styles;
