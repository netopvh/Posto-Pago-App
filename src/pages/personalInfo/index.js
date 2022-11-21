import React, {Component} from 'react';
import {TextInput, Button, Subheading, Card, Surface} from 'react-native-paper';
import styles from './styles';

export default class personalInfo extends Component {
  render() {
    return (
      <Surface style={styles.container}>
        <Card>
          <Card.Content>
            <Subheading style={styles.header}>
              Confirme seus dados pessoais
            </Subheading>
            <TextInput mode="outlined" label="Nome" />
            <TextInput mode="outlined" label="Email" />
            <TextInput mode="outlined" label="CPF" />
            <TextInput mode="outlined" label="Telefone" />
          </Card.Content>
          <Card.Actions style={styles.btnPanel}>
            <Button
              icon="check"
              mode="contained"
              labelStyle={styles.btnText}
              style={styles.btn}>
              Confirmar
            </Button>
            <Button
              icon="arrow-back"
              mode="contained"
              labelStyle={styles.btnText}
              style={styles.btn}
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              Voltar
            </Button>
          </Card.Actions>
        </Card>
      </Surface>
    );
  }
}
