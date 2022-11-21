import {StyleSheet} from 'react-native';
import {Colors} from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  company: {
    color: `${Colors.green300}`,
    backgroundColor: `${Colors.grey500}`,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  fuelPanel: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  fuelName: {
    color: Colors.red500,
  },
  fuelPrice: {
    flex: 1,
  },
});

export default styles;
