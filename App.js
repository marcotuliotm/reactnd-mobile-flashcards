import React from 'react';
import { Root } from 'native-base';
import { Font, AppLoading } from 'expo';
import { StackNavigator } from 'react-navigation';
import CardView from './components/Deck';
import DeckList from './components/DeckList';
import DeckCreate from './components/DeckCreate';
import { purple, white } from './utils/colors';


const Roboto = require('native-base/Fonts/Roboto.ttf');
const robotoMedium = require('native-base/Fonts/Roboto_medium.ttf');

const MainNavigator = StackNavigator({
  Home: {
    headerTitle: 'FlashMobiles',
    screen: DeckList,
    navigationOptions: {
      headerTitle: 'FlashMobiles',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
    },
  },
  Deck: {
    screen: CardView,
    navigationOptions: {
      headerTitle: 'FlashMobiles',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
    },
  },
  DeckCreate: {
    screen: DeckCreate,
    navigationOptions: {
      headerTitle: 'FlashMobiles',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
    },
  },
});

export default class App extends React.Component {
  state = { loading: true };
  async componentWillMount() {
    await Font.loadAsync({
      Roboto,
      Roboto_medium: robotoMedium,

    });
    this.setState({ loading: false });
  }
  render() {
    if (this.state.loading) {
      return (
        <Root>
          <AppLoading />
        </Root>
      );
    }
    return (
      <Root>
        <MainNavigator />

      </Root>

    );
  }
}

