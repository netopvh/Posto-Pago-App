import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Drawer, List, Avatar, Colors, Surface} from 'react-native-paper';
import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';
import {signOutApi} from './../../store/actions/signIn';

const styles = StyleSheet.create({
  userPanel: {
    margin: 10,
    borderRadius: 15,
  },
  avatarIcon: {
    alignSelf: 'center',
  },
});

const myDrawer = ({navigation, signOutApi, authState}) => (
  <Surface style={{flex: 1}}>
    <Drawer.Section>
      {authState.user.info ? (
        <View style={styles.userPanel}>
          <List.Item
            title={authState.user.info.name}
            description={authState.user.info.email}
            left={props => (
              <Avatar.Icon
                {...props}
                style={styles.avatarIcon}
                icon="account-circle"
                size={45}
                color={Colors.cyan300}
              />
            )}
          />
        </View>
      ) : null}
    </Drawer.Section>

    <Drawer.Section title="Menu">
      <Drawer.Item
        label="Principal"
        icon="folder"
        active={navigation.state.routes[navigation.state.index].key === 'Main'}
        onPress={() => navigation.navigate('Main')}
      />
      <Drawer.Item
        label="Comprar"
        icon="shopping-cart"
        active={
          navigation.state.routes[navigation.state.index].key === 'Purchase'
        }
        onPress={() => navigation.navigate('Purchase')}
      />
      {authState.user.info && authState.user.info.permission === 'customer' ? (
        <>
          {/* <Drawer.Item
            label="Recarregar"
            icon="cached"
            active={
              navigation.state.routes[navigation.state.index].key === 'Recharge'
            }
            onPress={() => navigation.navigate('Recharge')}
          /> */}
          <Drawer.Item
            label="Compras"
            icon="local-atm"
            active={
              navigation.state.routes[navigation.state.index].key ===
              'PurchaseList'
            }
            onPress={() => navigation.navigate('Main')}
          />
          <Drawer.Item
            label="Recargas"
            icon="cached"
            active={
              navigation.state.routes[navigation.state.index].key ===
              'RechargeList'
            }
            onPress={() => navigation.navigate('Main')}
          />
        </>
      ) : (
        <View />
      )}
      {authState.user.info && authState.user.info.permission !== 'customer' ? (
        <>
          <Drawer.Item
            label="Ler QRcode"
            icon="receipt"
            active={
              navigation.state.routes[navigation.state.index].key ===
              'ReadQRCode'
            }
            onPress={() => navigation.navigate('ReadQRCode')}
          />
        </>
      ) : (
        <View />
      )}
      {authState.user.info && !authState.user.info.phone_verified ? (
        <Drawer.Item
          label="Confirmar celular"
          icon="phone"
          active={
            navigation.state.routes[navigation.state.index].key ===
            'PhoneConfirm'
          }
          onPress={() => navigation.navigate('PhoneConfirm')}
        />
      ) : (
        <View />
      )}
      <Drawer.Item
        label="Sair"
        icon="exit-to-app"
        onPress={() => signOutApi(navigation)}
      />
    </Drawer.Section>
  </Surface>
);

const mapStateToProps = state => ({
  authState: state.authReducer,
});

const mapDispatchToProps = dispatch => ({
  signOutApi: navigation => dispatch(signOutApi(navigation)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(myDrawer));
