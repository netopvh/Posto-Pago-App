import React, {useState} from 'react';
import {View, Image} from 'react-native';
import {TextInput, Button, Surface} from 'react-native-paper';
import {connect} from 'react-redux';
import styles from './styles';
import {signInApiRequest} from './../../store/actions/signIn';
import FlashMessage from './../../components/flashMessage';
import Loading from './../../components/loadingScreen';

const signIn = ({isLoading, authState, error, navigation, singInRequest}) => {
  if (authState.signedIn) {
    navigation.navigate('App');
    return <Loading />;
  } else {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
      <Surface style={styles.container}>
        <Image
          style={styles.logo}
          source={require('./../../assets/logo.png')}
          resizeMode="contain"
        />
        <TextInput
          label="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          mode="outlined"
          autoCapitalize="none"
          returnKeyType="next"
        />
        <TextInput
          label="Senha"
          value={password}
          onChangeText={text => setPassword(text)}
          mode="outlined"
          autoCapitalize="none"
          secureTextEntry
        />

        <Button
          icon="send"
          mode="contained"
          style={styles.myButton}
          loading={isLoading}
          disabled={isLoading}
          onPress={() => singInRequest(email, password)}
          color="#0000CD">
          Acessar
        </Button>

        <Button
          icon="person-add"
          mode="contained"
          style={styles.myButton}
          disabled={isLoading}
          onPress={() => navigation.push('SignUp')}
          color="#1E90FF">
          Cadastrar
        </Button>

        <FlashMessage
          open={error.open}
          type={error.type}
          message={error.message}
        />
      </Surface>
    );
  }
};

const mapStateToProps = state => ({
  authState: state.authReducer,
  error: state.flashMessageReducer,
  isLoading: state.authReducer.signingIn,
});

const mapDispatchToProps = dispatch => ({
  singInRequest: (email, password) =>
    dispatch(signInApiRequest(email, password)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(signIn);
