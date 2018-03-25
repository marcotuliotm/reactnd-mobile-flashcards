import React from 'react';
import { Root } from 'native-base';
import { Font, AppLoading } from 'expo';
import { StackNavigator } from 'react-navigation';
import DeckView from './components/Deck';
import DeckList from './components/DeckList';
import DeckCreate from './components/DeckCreate';
import CardCreate from './components/CardCreate';
import CardSwiper from './components/CardSwiper';
import { purple, white } from './utils/colors';
import { setLocalNotification } from './utils/helpers';


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
    screen: DeckView,
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
  CardCreate: {
    screen: CardCreate,
    navigationOptions: {
      headerTitle: 'FlashMobiles',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
    },
  },
  Quiz: {
    screen: CardSwiper,
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

  componentDidMount() {
    setLocalNotification();
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

