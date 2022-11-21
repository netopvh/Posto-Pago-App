import React, {useState, useEffect} from 'react';
import {Portal, Dialog, List, Button} from 'react-native-paper';
import {connect} from 'react-redux';
import {getCompanies} from './../../../store/actions/company';
import {setCompany} from './../../../store/actions/purchase';
import {MaskService} from 'react-native-masked-text';
import {withNavigation} from 'react-navigation';

const CompanyList = ({getCompanies, setCompany, isSelected, navigation}) => {
  const handleSelection = (company, fuel) => {
    setCompany({id: company.id, name: company.name}, fuel);
    setVisible(!isSelected);
  };

  const [visible, setVisible] = useState(isSelected);
  const [companies, setCompanies] = useState({});

  useEffect(() => {
    async function getAllCompanies() {
      setCompanies(await getCompanies());
    }
    getAllCompanies();
    setVisible(!isSelected);
  }, [getCompanies, isSelected]);

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={() => setVisible(!isSelected)}>
        <Dialog.Title>Escolha um Posto</Dialog.Title>
        <Dialog.Content>
          {companies.length > 0 ? (
            companies.map(company => (
              <List.Accordion
                key={company.id}
                id={company.id}
                title={company.name}
                left={props => <List.Icon {...props} icon="beenhere" />}>
                {company.fuelList.map(fuel => (
                  <List.Item
                    title={fuel.name}
                    description={`${MaskService.toMask(
                      'money',
                      parseFloat(fuel.shop_price).toFixed(2),
                    )} - ${MaskService.toMask(
                      'money',
                      parseFloat(fuel.app_price).toFixed(2),
                    )}`}
                    key={fuel.id}
                    left={props => (
                      <List.Icon {...props} icon="local-gas-station" />
                    )}
                    onPress={() => handleSelection(company, fuel)}
                  />
                ))}
              </List.Accordion>
            ))
          ) : (
            <List.Item title="Carregando...." />
          )}
        </Dialog.Content>
        <Dialog.Actions>
          <Button mode="contained" onPress={() => navigation.navigate('Main')}>
            Cancelar
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  getCompanies: page => dispatch(getCompanies(page)),
  setCompany: (company, fuel) => dispatch(setCompany(company, fuel)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(CompanyList));
