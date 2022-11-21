import React from 'react';
import {Snackbar, Caption, Portal} from 'react-native-paper';
import {connect} from 'react-redux';
import {flashMessageClose} from '../../store/actions/flashMessages';
import {FlashMessage} from './../../store/actions/actionTypes';
import styles from './styles';
import {withNavigation} from 'react-navigation';

class flashMessage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      message,
      type,
      open,
      nextPage = '',
      flashMessageClose,
      navigation,
    } = this.props;

    const handleStyle = type => {
      switch (type) {
        case 'info':
          return styles.info;
        case 'warning':
          return styles.warning;
        case 'success':
          return styles.success;
        case 'error':
          return styles.error;
        default:
          return styles.default;
      }
    };

    const handleDismiss = () => {
      nextPage !== '' ? navigation.navigate(nextPage) : null;
      flashMessageClose();
    };

    return (
      <Portal>
        <Snackbar
          duration={3000}
          visible={open}
          onDismiss={handleDismiss}
          style={[styles.toast, handleStyle(type)]}>
          <Caption style={styles.caption}>{message}</Caption>
        </Snackbar>
      </Portal>
    );
  }
}

const mapStateToProps = state => ({
  state,
});

const mapDispatchToProps = dispatch => ({
  flashMessageClose: () => dispatch(flashMessageClose()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(flashMessage));
