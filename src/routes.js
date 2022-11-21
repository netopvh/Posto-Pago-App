import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import myDrawer from './components/navDrawer';

import AuthLoadingScreen from './pages/AuthLoading';
import Main from './pages/main';
import SignIn from './pages/signIn';
import SignUp from './pages/signUp';
import PersonalInfo from './pages/personalInfo';
import PhoneConfirm from './pages/phoneConfirm';
import Purchase from './pages/Purchase';
import Recharge from './pages/recharge';
import ViewQrCode from './pages/viewQrCode';
import ReadQRCode from './pages/ReadQRCode';
import confirmPurchase from './pages/confirmPurchase';
import UserRecharge from './pages/UserRecharge';

const LoginStack = createStackNavigator(
  {
    SignIn,
    SignUp,
    PersonalInfo,
    PhoneConfirm,
    Main,
  },
  {
    headerMode: 'none',
  },
  {
    navigationOptions: {
      header: null,
    },
  },
);

const MainStack = createDrawerNavigator(
  {
    Main,
    Purchase,
    Recharge,
    ViewQrCode,
    ReadQRCode,
    confirmPurchase,
    PhoneConfirm,
    UserRecharge,
  },
  {
    unmountInactiveRoutes: true,
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
    contentComponent: myDrawer,
    contentOptions: {
      activeTintColor: '#DCDCDC',
      activeBackgroundColor: '#0000CD',
    },
  },
);

const Routes = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: MainStack,
      Auth: LoginStack,
    },
    {initialRouteName: 'AuthLoading'},
  ),
);

export default Routes;
