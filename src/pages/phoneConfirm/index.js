import React from 'react';
import {
  Surface,
  Headline,
  TextInput,
  Button,
  Text,
  HelperText,
} from 'react-native-paper';
import {connect} from 'react-redux';

import {confirmPhoneNumber, resendCodeApi} from './../../store/actions/signIn';
import styles from './styles';

class PhoneConfirm extends React.Component {
  state = {
    code: [null, null, null, null],
    error: null,
    show_resend: false,
  };
  toggleResend = () => {
    this.setState({show_resend: !this.state.show_resend});
  };

  resendCode = () => {
    this.toggleResend();
    this.props.resendCode(this.setError);
  };

  handleCode = () => {
    setTimeout(() => {
      this.toggleResend();
    }, 30000);
    const {confirmPhoneNumber, navigation} = this.props;
    const code =
      this.state.code[0] +
      this.state.code[1] +
      this.state.code[2] +
      this.state.code[3];
    confirmPhoneNumber(code, navigation, this.setError);
  };

  handleCodeChange = (number, index) => {
    const c = this.state.code;
    c[index] = number;
    this.setState({code: c, error: null});
  };

  setError = msg => {
    this.setState({error: msg, code: [null, null, null, null]});
  };

  render() {
    const {signUpLoading, codeLoading, codeSent} = this.props.authState;
    return (
      <Surface style={styles.container}>
        <Headline> Digite o código recebido via SMS </Headline>
        <Surface style={styles.inputContainer}>
          <TextInput
            ref={ref => (this.input0 = ref)}
            mode="outlined"
            style={styles.input}
            value={this.state.code[0]}
            keyboardType="numeric"
            autoFocus={true}
            onChangeText={text => {
              this.input1.focus();
              this.handleCodeChange(text, 0);
            }}
            maxLength={1}
            disabled={signUpLoading}
            selectTextOnFocus={true}
          />
          <TextInput
            ref={ref => (this.input1 = ref)}
            mode="outlined"
            style={[styles.input, styles.fontSize]}
            value={this.state.code[1]}
            keyboardType="numeric"
            onChangeText={text => {
              this.input2.focus();
              this.handleCodeChange(text, 1);
            }}
            disabled={signUpLoading}
            maxLength={1}
            selectTextOnFocus={true}
          />
          <TextInput
            mode="outlined"
            ref={ref => (this.input2 = ref)}
            style={styles.input}
            value={this.state.code[2]}
            keyboardType="numeric"
            onChangeText={text => {
              this.input3.focus();
              this.handleCodeChange(text, 2);
            }}
            maxLength={1}
            disabled={signUpLoading}
            selectTextOnFocus={true}
          />
          <TextInput
            mode="outlined"
            ref={ref => (this.input3 = ref)}
            style={styles.input}
            value={this.state.code[3]}
            keyboardType="numeric"
            onChangeText={text => {
              this.input3.blur();
              this.handleCodeChange(text, 3);
            }}
            maxLength={1}
            disabled={signUpLoading}
            selectTextOnFocus={true}
          />
        </Surface>
        <Surface style={styles.errorContainer}>
          <HelperText
            type="error"
            visible={this.state.error}
            style={styles.errorText}>
            {this.state.error}
          </HelperText>
        </Surface>
        <Button
          icon="check"
          mode="contained"
          style={styles.btn}
          onPress={this.handleCode}
          loading={signUpLoading}
          disabled={
            !this.state.code[0] ||
            !this.state.code[1] ||
            !this.state.code[2] ||
            !this.state.code[3] ||
            signUpLoading
          }>
          Confirmar
        </Button>
        <Surface style={styles.resendContainer}>
          {this.state.show_resend && !codeLoading && !codeSent ? (
            <Text style={styles.resendText} onPress={this.resendCode}>
              Reenviar código
            </Text>
          ) : (
            <Text />
          )}
          {codeLoading ? (
            <Text style={styles.resendText}>Enviando código...</Text>
          ) : (
            <Text />
          )}
          {codeSent ? (
            <Text style={styles.resendText}>Código enviado</Text>
          ) : (
            <Text />
          )}
        </Surface>
      </Surface>
    );
  }
}

const mapStateToProps = state => ({
  authState: state.authReducer,
});

const mapDispatchToProps = dispatch => ({
  confirmPhoneNumber: (code, navigation, setError) =>
    dispatch(confirmPhoneNumber(code, navigation, setError)),
  resendCode: setError => dispatch(resendCodeApi(setError)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PhoneConfirm);
