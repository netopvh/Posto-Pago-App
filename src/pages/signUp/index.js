import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Image} from 'react-native';
import {MaskService} from 'react-native-masked-text';
import {
  TextInput,
  Card,
  Subheading,
  Button,
  HelperText,
  Surface,
} from 'react-native-paper';
import styles from './styles.js';
import {signUp, stopSignUpRequest} from './../../store/actions/signIn';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Formik} from 'formik';
import * as Yup from 'yup';

const validation = Yup.object().shape({
  name: Yup.string().required('Campo obrigatório'),
  email: Yup.string()
    .email('Email inválido')
    .required('Campo obrigatório'),
  cpf: Yup.string()
    .length(11, 'Cpf inválido')
    .required('Campo obrigatório'),
  password: Yup.string()
    .min(8, 'Minimo de 8 caracteres')
    .required('Campo obrigatório')
    .oneOf([Yup.ref('confirmPassword'), null], 'Senhas são diferentes.'),
  confirmPassword: Yup.string()
    .min(8, 'Minimo de 8 caracteres')
    .required('Campo obrigatório')
    .oneOf([Yup.ref('password'), null], 'Senhas são diferentes.'),
  phone: Yup.string()
    .min(10, 'Telefone inválido')
    .max(11, 'Telefone inválido')
    .required('Campo obrigatório'),
});

class SignUpScreen extends React.Component {
  user = {
    name: '',
    email: '',
    cpf: '',
    password: '',
    phone: '',
    confirmPassword: '',
  };

  componentDidMount() {
    this.props.resetForm();
  }

  render() {
    const {user, signUp, resetForm, authState, navigation} = this.props;
    return (
      <KeyboardAwareScrollView
        resetScrollToCoords={{x: 0, y: 0}}
        contentContainerStyle={styles.container}
        scrollEnabled={true}>
        <Surface style={styles.container}>
          <Image
            style={styles.logo}
            resizeMode="contain"
            source={require('./../../assets/logo.png')}
          />
          <Formik
            initialValues={this.user}
            validationSchema={validation}
            onSubmit={(values, {setErrors}) => {
              values.cpf = MaskService.toRawValue('cpf', values.cpf);
              values.phone = MaskService.toRawValue('cel-phone', values.phone);
              signUp(values, navigation, setErrors);
            }}
            render={({values, ...props}) => (
              <Card>
                <Card.Content>
                  <Subheading style={styles.header}>
                    Confirme seus dados pessoais
                  </Subheading>
                  <TextInput
                    disabled={authState.signUpLoading}
                    mode="outlined"
                    label="Nome"
                    value={values.name}
                    autoCapitalize="words"
                    error={props.touched.name && props.errors.name}
                    onChangeText={props.handleChange('name')}
                    onBlur={props.handleBlur('name')}
                  />
                  {props.touched.name && props.errors.name ? (
                    <HelperText type="error">{props.errors.name}</HelperText>
                  ) : (
                    <Surface />
                  )}
                  <Surface>
                    <TextInput
                      disabled={authState.signUpLoading}
                      mode="outlined"
                      label="Email"
                      value={values.email}
                      autoCapitalize="none"
                      keyboardType="email-address"
                      error={props.touched.email && props.errors.email}
                      onChangeText={props.handleChange('email')}
                      onBlur={props.handleBlur('email')}
                    />
                    {props.touched.email && props.errors.email ? (
                      <HelperText type="error">{props.errors.email}</HelperText>
                    ) : (
                      <Surface />
                    )}
                  </Surface>
                  <TextInput
                    disabled={authState.signUpLoading}
                    maxLength={14}
                    mode="outlined"
                    label="CPF"
                    value={MaskService.toMask('cpf', values.cpf)}
                    autoCapitalize="none"
                    keyboardType="number-pad"
                    error={props.touched.cpf && props.errors.cpf}
                    onChangeText={value => {
                      props.setFieldValue(
                        'cpf',
                        MaskService.toRawValue('cpf', value),
                      );
                      props.handleChange('cpf');
                    }}
                    onBlur={props.handleBlur('cpf')}
                  />
                  {props.touched.cpf && props.errors.cpf ? (
                    <HelperText type="error">{props.errors.cpf}</HelperText>
                  ) : (
                    <Surface />
                  )}
                  <TextInput
                    disabled={authState.signUpLoading}
                    maxLength={15}
                    mode="outlined"
                    label="Telefone"
                    value={MaskService.toMask('cel-phone', values.phone)}
                    autoCapitalize="none"
                    keyboardType="numeric"
                    error={props.touched.phone && props.errors.phone}
                    onChangeText={value => {
                      props.setFieldValue(
                        'phone',
                        MaskService.toRawValue('cel-phone', value),
                      );
                      props.handleChange('phone');
                    }}
                    onBlur={props.handleBlur('phone')}
                  />
                  {props.touched.phone && props.errors.phone ? (
                    <HelperText type="error">{props.errors.phone}</HelperText>
                  ) : (
                    <Surface />
                  )}
                  <TextInput
                    disabled={authState.signUpLoading}
                    mode="outlined"
                    label="Senha"
                    value={values.password}
                    autoCapitalize="none"
                    error={props.touched.password && props.errors.password}
                    onChangeText={props.handleChange('password')}
                    onBlur={props.handleBlur('password')}
                    secureTextEntry
                  />
                  {props.touched.password && props.errors.password ? (
                    <HelperText type="error">
                      {props.errors.password}
                    </HelperText>
                  ) : (
                    <Surface />
                  )}
                  <TextInput
                    disabled={authState.signUpLoading}
                    mode="outlined"
                    label="Confirme a Senha"
                    value={values.confirmPassword}
                    error={
                      props.touched.confirmPassword &&
                      props.errors.confirmPassword
                    }
                    onChangeText={props.handleChange('confirmPassword')}
                    onBlur={props.handleBlur('confirmPassword')}
                    autoCapitalize="none"
                    secureTextEntry
                  />
                  {props.touched.confirmPassword &&
                  props.errors.confirmPassword ? (
                    <HelperText type="error">
                      {props.errors.confirmPassword}
                    </HelperText>
                  ) : (
                    <Surface />
                  )}
                </Card.Content>
                <Card.Actions style={styles.btnPanel}>
                  <Button
                    icon="check"
                    mode="contained"
                    loading={authState.signUpLoading}
                    labelStyle={styles.btnText}
                    style={styles.btn}
                    color="#0000CD"
                    disabled={!props.isValid || authState.signUpLoading}
                    onPress={props.handleSubmit}>
                    Confirmar
                  </Button>
                  <Button
                    icon="arrow-back"
                    mode="contained"
                    labelStyle={styles.btnText}
                    style={styles.btn}
                    color="#0000CD"
                    disabled={authState.signUpLoading}
                    onPress={() => {
                      navigation.goBack();
                    }}>
                    Voltar
                  </Button>
                </Card.Actions>
              </Card>
            )}
          />
        </Surface>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = state => ({
  authState: state.authReducer,
});

const mapDispatchToProps = dispatch => ({
  signUp: (user, navigation, setFormikErrors) =>
    dispatch(signUp(user, navigation, setFormikErrors)),
  resetForm: () => dispatch(stopSignUpRequest()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUpScreen);
