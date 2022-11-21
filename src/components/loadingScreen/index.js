import React from 'react';
import {ActivityIndicator, Surface} from 'react-native-paper';

const Loading = () => (
  <Surface style={{flex: 1, justifyContent: 'center'}}>
    <ActivityIndicator animating={true} color="#0000CD" size={65} />
  </Surface>
);

export default Loading;
