import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {
  List,
  Caption,
  IconButton,
  Colors,
  Card,
  Avatar,
  Text,
  Subheading,
  Portal,
  Dialog,
  Button,
  Surface,
} from 'react-native-paper';
import styles from './styles';
import {connect} from 'react-redux';
import {MaskService} from 'react-native-masked-text';
import {withNavigation} from 'react-navigation';
import {calcPurchases} from './../../utils/Helpers';
import {getUserDataApi} from './../../store/actions/signIn';
import {DrawerActions} from 'react-navigation-drawer';
import {flashMessageClose} from '../../store/actions/flashMessages';

import Moment from 'react-moment';
import 'moment/locale/pt-br';
import {checkPending} from './../../utils/Helpers';
import {cancelPurchase} from '../../store/actions/purchase';

function userScreen({authState, navigation, getUserDataApi, cancelPurchase}) {
  const [purchaseId, setPurchaseId] = useState(0);
  const [visible, setVisible] = useState(false);
  let pendingRecharges = checkPending(authState.user.info.history.recharges);

  return (
    <ScrollView>
      <Surface style={styles.container}>
        <Surface style={styles.topHeader}>
          <Surface>
            <IconButton
              icon="menu"
              animated={true}
              size={40}
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            />
          </Surface>
          <Surface style={styles.logoPanel}>
            <Avatar.Image
              source={require('./../../assets/logo.png')}
              size={60}
              style={styles.logo}
              resizeMode="contain"
            />
          </Surface>
        </Surface>

        <Card style={styles.panel}>
          <Card.Title
            title="Saldo"
            titleStyle={styles.header}
            left={newProps => (
              <Avatar.Icon {...newProps} icon="account-circle" />
            )}
            right={() => (
              <IconButton
                mode="outlined"
                color={Colors.green500}
                icon="refresh"
                disabled={false}
                onPress={() => getUserDataApi(navigation)}
                style={styles.iconList}
              />
            )}
          />
          <Card.Content>
            <Surface>
              <List.Item
                style={styles.balanceItem}
                title={
                  <Subheading>
                    {MaskService.toMask(
                      'money',
                      parseFloat(authState.user.info.balance.credits).toFixed(
                        2,
                      ),
                    )}
                  </Subheading>
                }
                description={() => <Subheading>Disponivel</Subheading>}
              />
              <List.Item
                style={styles.balanceItem}
                title={
                  <Subheading>
                    {MaskService.toMask(
                      'money',
                      parseFloat(
                        authState.user.info.balance.pending_credits,
                      ).toFixed(2),
                    )}
                  </Subheading>
                }
                description={() => (
                  <Surface>
                    <Subheading>Bloqueado</Subheading>
                    {pendingRecharges.length > 0 ? (
                      <>
                        <Surface style={styles.infoBlock}>
                          <Caption>Desbloqueio </Caption>
                          <Moment
                            locale="pt-br"
                            add={{days: 1}}
                            fromNow
                            element={Caption}
                            interval={1000}>
                            {pendingRecharges[0].created_at}
                          </Moment>

                          <Caption>
                            , no valor de{' '}
                            {MaskService.toMask(
                              'money',
                              parseFloat(pendingRecharges[0].amount).toFixed(2),
                            )}
                          </Caption>
                        </Surface>
                      </>
                    ) : (
                      <Caption>Sem recargas pendentes</Caption>
                    )}
                  </Surface>
                )}
              />
              <List.Item
                style={styles.balanceItem}
                title={
                  <Subheading>
                    {MaskService.toMask(
                      'money',
                      parseFloat(
                        calcPurchases(authState.user.info.history.purchases),
                      ).toFixed(2),
                    )}
                  </Subheading>
                }
                description="Consumido"
              />
            </Surface>
          </Card.Content>
        </Card>
        <Card style={styles.panel}>
          <Card.Title
            title="Últimas Compras"
            left={props => <Avatar.Icon {...props} icon="shopping-basket" />}
          />
          <Card.Content>
            {authState.user.info.history.purchases.map(item => (
              <List.Item
                style={styles.listItem}
                title={<Text>{item.fuel_name}</Text>}
                key={item.id}
                description={() => (
                  <>
                    <Text>{`${MaskService.toMask(
                      'money',
                      parseFloat(item.amount).toFixed(2),
                    )}`}</Text>
                    <Moment format="DD/MM/YYYY - HH:mm" element={Caption}>
                      {item.created_at}
                    </Moment>
                  </>
                )}
                onPress={
                  !item.cancelled && !item.confirmed
                    ? () =>
                        navigation.navigate('ViewQrCode', {
                          purchase: item,
                        })
                    : null
                }
                right={props => (
                  <>
                    <IconButton
                      {...props}
                      mode="outlined"
                      color={Colors.yellowA400}
                      icon={!item.confirmed ? 'access-time' : 'check'}
                      size={20}
                      disabled={item.cancelled}
                      style={styles.iconList}
                    />
                    <IconButton
                      {...props}
                      mode="outlined"
                      color={Colors.red600}
                      icon="delete"
                      size={20}
                      disabled={item.cancelled || item.confirmed}
                      onPress={() => {
                        setPurchaseId(item.id);
                        setVisible(!visible);
                      }}
                      style={styles.iconList}
                    />
                  </>
                )}
              />
            ))}
          </Card.Content>
        </Card>

        <Portal>
          <Dialog visible={visible} onDismiss={() => {}}>
            <Dialog.Title>Cancelamento de Compra</Dialog.Title>
            <Dialog.Content>
              <Text>Deseja realizar o cancelamento dessa compra?</Text>
            </Dialog.Content>

            <Dialog.Actions style={{justifyContent: 'space-around'}}>
              <Button
                mode="contained"
                onPress={() => setVisible(cancelPurchase(purchaseId))}>
                Cancelar
              </Button>
              <Button mode="contained" onPress={() => setVisible(!visible)}>
                Desistir
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </Surface>
    </ScrollView>
  );
}

const mapStateToProps = state => ({
  authState: state.authReducer,
  error: state.flashMessageReducer,
});

const mapDispatchToProps = dispatch => ({
  getUserDataApi: navigation => dispatch(getUserDataApi(navigation)),
  flashMessageClose: () => dispatch(flashMessageClose()),
  cancelPurchase: purchaseId => dispatch(cancelPurchase(purchaseId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(userScreen));
