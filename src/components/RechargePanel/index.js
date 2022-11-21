import React, {useState} from 'react';

import {connect} from 'react-redux';

import {Portal, Dialog, List} from 'react-native-paper';

import styles from './styles';

function RechargePanel({recharges, visibled}) {
  const [visible, setVisible] = useState(visibled);
  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={() => {
          setVisible(false);
        }}>
        <Dialog.Title>Recargas</Dialog.Title>
        <Dialog.Content>
          {recharges.map(recharge => (
            <List.Item
              key={recharge.amount}
              style={styles.container}
              title={recharge.amount}
            />
          ))}
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
}

const mapStateToProps = state => ({
  recharges: state.authReducer.user.info.history.recharges,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RechargePanel);
