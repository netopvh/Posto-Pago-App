import {StyleSheet} from 'react-native';
import {Colors} from 'react-native-paper';

const styles = StyleSheet.create({
  container: {},
  logo: {
    resizeMode: 'contain',
    backgroundColor: 'rgba(0,0,0,0.0)',
  },
  logoPanel: {
    flex: 1,
    alignItems: 'flex-end',
    margin: 5,
  },
  listItem: {
    backgroundColor: `${Colors.deepPurple500}`,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 20,
  },
  balanceItem: {
    borderBottomWidth: 1,
    borderColor: `${Colors.deepPurple500}`,
  },
  panel: {},
  header: {
    textDecorationColor: `${Colors.deepPurple500}`,
    alignItems: 'center',
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleItem: {
    justifyContent: 'center',
  },
  iconList: {
    alignSelf: 'center',
  },
  infoBlock: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default styles;
