import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {getToken} from './../../store/actions/signIn';
import Loading from './../../components/loadingScreen';

class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    this._bootstrapAsync();
  }
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('@PostoPago:token');
    if (userToken) {
      this.props.getToken(userToken);
    }
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  render() {
    return <Loading />;
  }
}

const mapStateToProps = state => ({
  Authstate: state.authReducer,
});

const mapDispatchToProps = dispatch => ({
  getToken: token => dispatch(getToken(token)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthLoadingScreen);
