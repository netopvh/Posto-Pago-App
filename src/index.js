import React from 'react';
import {Provider as StoreProvider} from 'react-redux';
import {DarkTheme, Provider as PaperProvider, Colors} from 'react-native-paper';
import Icons from 'react-native-vector-icons/MaterialIcons';
import store from './store';
import Routes from './routes';
if (__DEV__) {
  require('react-devtools');
}

const theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: `${Colors.deepPurple500}`,
  },
};

const App = () => (
  <StoreProvider store={store}>
    <PaperProvider
      theme={theme}
      settings={{icons: props => <Icons {...props} />}}>
      <Routes />
    </PaperProvider>
  </StoreProvider>
);

export default App;
