import React, { Component } from 'react';
import { StyleSheet, Animated } from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Icon,
  List,
  ListItem,
  Text,
  Thumbnail,
  Left,
  Right,
  Body,
  Button,
  Spinner,
  View,
} from 'native-base';
import PropTypes from 'prop-types';
import { getDecks } from '../../utils/api';


const deckImage = require('../../assets/deck.png');


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
  },
  text: {
    alignSelf: 'center',
    marginBottom: 7,
  },
  mb: {
    marginBottom: 15,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


class DeckList extends Component {
  state ={
    decks: [],
    load: false,
    opacity: new Animated.Value(0),
    isAnimated: false,
  }

  componentWillMount() {
    this.fecthDecks();
  }

  fecthDecks= () => {
    this.setState({ load: true });
    getDecks().then(data => this.setState({ decks: data, load: false }));
  }

  addDeck= (deck) => {
    const { decks } = this.state;
    decks.push(deck);
    this.setState({ decks });
  }

  addCard= (title, question) => {
    const { decks } = this.state;
    this.setState({ load: true });
    decks.find(deck => deck.title === title).questions.push(question);
    this.setState({ load: false });

    this.setState({ decks });
  }

  addResult= (title, result) => {
    const { decks } = this.state;
    this.setState({ load: true });
    decks.find(deck => deck.title === title).result = result;
    this.setState({ load: false });

    this.setState({ decks });
  }

  goDeck = (deck) => {
    this.setState({ isAnimated: true });
    const { opacity } = this.state;
    Animated.timing(opacity, { toValue: 1, duration: 2000 }).start();
    setTimeout(() => {
      this.props.navigation.navigate('Deck', { deck, addCard: this.addCard, addResult: this.addResult });
      this.setState({
        opacity: new Animated.Value(0),
        isAnimated: false,
      });
    }, 2050);
  }

  render() {
    const {
      load, decks, isAnimated, opacity,
    } = this.state;

    return (
      <Container style={styles.container}>
        <Header>
          <Body>
            <Title>Decks</Title>
          </Body>
          <Right />
          <Right>
            <Button transparent onPress={() => this.props.navigation.navigate('DeckCreate', { addDeck: this.addDeck })}>
              <Text>
                      new
              </Text>
              <Icon name="md-add" />
            </Button>
          </Right>
        </Header>
        {isAnimated ? (
          <View style={styles.center}>
            <Animated.Image
              source={deckImage}
              style={{ opacity }}
            />
          </View>
          ) : (
            <Content>
              {load ? (<Spinner />) : (
                <List
                  dataArray={decks}
                  renderRow={data =>
              (
                <ListItem avatar onPress={() => this.goDeck(data)}>
                  <Left>
                    <Thumbnail small source={deckImage} />
                  </Left>
                  <Body>
                    <Text>
                      {data.title}
                    </Text>
                    <Text numberOfLines={1} note>
                      {data.questions.length} cards
                    </Text>
                  </Body>
                  <Right>
                    {data.result.length > 0 ? (
                      <Text note>
                      Last score: {data.result}
                      </Text>) : (null)}
                  </Right>
                  <Right>
                    <Icon name="md-arrow-forward" />
                  </Right>
                </ListItem>
              )}
                />)}
            </Content>
        )}
      </Container>
    );
  }
}


DeckList.propTypes = {
  navigation: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default DeckList;
