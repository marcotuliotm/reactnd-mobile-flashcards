import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
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
});


class DeckList extends Component {
  state ={
    decks: [],
    load: false,
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

  render() {
    const { load, decks } = this.state;

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
        <Content>
          {load ? (<Spinner />) : (
            <List
              dataArray={decks}
              renderRow={data =>
              (
                <ListItem avatar onPress={() => this.props.navigation.navigate('Deck', { deck: data, addCard: this.addCard })}>
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
                    <Icon name="md-arrow-forward" />
                  </Right>
                </ListItem>
              )}
            />)}
        </Content>
      </Container>
    );
  }
}


DeckList.propTypes = {
  navigation: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default DeckList;
