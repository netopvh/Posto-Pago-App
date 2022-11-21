import React from 'react';
import {StyleSheet} from 'react-native';
import InfoInline from '../../utils/components/InfoInline';
import {Surface} from 'react-native-paper';

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

class CustomerDetails extends React.Component {
  state = {email: ''};

  handleChange = value => {
    this.setState({email: value});
  };

  render() {
    const {details} = this.props;
    return (
      <Surface>
        <InfoInline label="Nome: " value={details.name} textSize={20} />
        <InfoInline label="Email: " value={details.email} textSize={20} />
      </Surface>
    );
  }
}

export default CustomerDetails;
