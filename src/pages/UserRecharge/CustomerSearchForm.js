import React from 'react';
import {StyleSheet} from 'react-native';
import {TextInput, Icon, IconButton, Surface} from 'react-native-paper';

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
  },
  input: {
    flex: 1,
  },
  iconBtnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    right: 5,
  },
});

class CustomerSearchForm extends React.Component {
  state = {search: ''};

  handleChange = value => {
    this.setState({search: value});
  };

  render() {
    const {searchCustomer, loading} = this.props;
    return (
      <Surface style={styles.root}>
        <TextInput
          autoCapitalize="none"
          style={styles.input}
          disabled={loading}
          mode="outlined"
          label="Email ou celular do cliente"
          value={this.state.search}
          onChangeText={text => this.handleChange(text)}
        />
        <Surface style={styles.iconBtnContainer}>
          <IconButton
            style={styles.searchIcon}
            icon="search"
            size={38}
            color="#000"
            onPress={() => searchCustomer(this.state.search)}
            loading={loading}
            disabled={loading || !this.state.search}
          />
        </Surface>
      </Surface>
    );
  }
}

export default CustomerSearchForm;
