import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
  },
  errorContainer: {
    alignItems: 'center',
  },
  errorText: {
    fontSize: 20,
  },
  btn: {
    marginTop: 10,
    paddingVertical: 20,
    color: '#0000CD',
    alignSelf: 'center',
  },
  resendContainer: {
    margin: 15,
    alignItems: 'center',
  },
  resendText: {
    fontSize: 20,
    textDecorationLine: 'underline',
    textDecorationStyle: 'dashed',
  },
});

export default styles;
