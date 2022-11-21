import React, {useState} from 'react';
import {Button, Dialog, Portal, Text} from 'react-native-paper';
import {connect} from 'react-redux';
import {flashMessageClose} from './../../store/actions/flashMessages';

function ConfirmAlert({visibled, header, message, flashMessageClose}) {
  const [visible, setVisible] = useState(visibled);
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={() => flashMessageClose()}>
        <Dialog.Title>
          <Text>{header}</Text>
        </Dialog.Title>
        <Dialog.Content>
          <Text>{message}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button mode="contained" onPress={() => setVisible(!visible)}>
            Ok
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const mapStateToProps = state => ({
  state,
});

const mapDispatchToProps = dispatch => ({
  flashMessageClose: () => dispatch(flashMessageClose()),
});

const Alerts = {ConfirmAlert};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Alerts);
