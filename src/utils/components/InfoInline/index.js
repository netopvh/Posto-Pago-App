import React from 'react';
import {StyleSheet} from 'react-native';
import {Surface, Text} from 'react-native-paper';

const InfoInline = ({label, value, textSize = 10}) => {
  const styles = StyleSheet.create({
    lineContainer: {
      flexDirection: 'row',
      padding: 10,
      fontSize: textSize,
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#d2d2d2',
    },
    lineLabel: {
      fontSize: textSize,
      fontWeight: 'bold',
    },
    lineValueText: {
      fontSize: textSize,
      flex: 1,
    },
  });
  return (
    <Surface style={styles.lineContainer}>
      <Text style={styles.lineLabel}>{label}</Text>
      <Text numberOfLines={1} style={styles.lineValueText}>
        {value}
      </Text>
    </Surface>
  );
};

export default InfoInline;
