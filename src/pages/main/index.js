import React from 'react';
import {connect} from 'react-redux';
import {getUserDataApi} from './../../store/actions/signIn';
import UserScreen from './../../components/userScreen';
import AttendentScreen from './../../components/attendentScreen';
import Loading from './../../components/loadingScreen';

class Main extends React.Component {
  componentDidMount() {
    this.props.authState.signOut && !this.props.authState.singIn
      ? this.props.navigation.navigate('Auth')
      : this.props.getUserDataApi(this.props.navigation);
  }

  handleScreen = permission =>
    permission === 'customer' ? <UserScreen /> : <AttendentScreen />;

  render() {
    return !this.props.authState.user.isEmpty &&
      !this.props.authState.user.isLoading ? (
      this.handleScreen(this.props.authState.user.info.permission)
    ) : (
      <Loading />
    );
  }
}

const mapStateToProps = state => ({
  authState: state.authReducer,
  error: state.flashMessageReducer,
});

const mapDispatchToProps = dispatch => ({
  getUserDataApi: navigation => dispatch(getUserDataApi(navigation)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);

//one signal
