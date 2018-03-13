import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import { purple } from './utils/colors';

const CenterView = styled.View` 
  flex: 1;
  background-color: ${purple};
  align-items: center;
  justify-content: center;
`;


export default class App extends React.Component {
  state ={

  }
  render() {
    return (
      <CenterView>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </CenterView>
    );
  }
}

