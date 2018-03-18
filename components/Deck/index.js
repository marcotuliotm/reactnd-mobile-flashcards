import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Card,
  CardItem,
  Text,
  Thumbnail,
  Left,
  Right,
  Body,
} from 'native-base';
import PropTypes from 'prop-types';


const deviceHeight = Dimensions.get('window').height;
const logo = require('../../assets/logo.png');


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
  },
  mb: {
    marginBottom: 15,
  },
  cardMain: {
    flex: 1,
    justifyContent: 'center',
    height: deviceHeight / 4,
  },
});

function Deck(props) {
  const { deck } = props.navigation.state.params;
  return (
    <Container style={styles.container}>
      <Header>
        <Body>
          <Title>Deck</Title>
        </Body>
        <Right />
      </Header>

      <Content padder>
        <Card style={styles.mb}>
          <CardItem bordered>
            <Left>
              <Thumbnail source={logo} />
              <Body>
                <Text>{deck.title}</Text>
                <Text note>April 15, 2016</Text>
              </Body>
            </Left>
          </CardItem>

          <CardItem style={styles.cardMain} />
          <CardItem style={styles.cardMain}>

            <Body >
              <Left>
                <Button iconLeft primary>
                  <Icon name="md-add" />
                  <Text>Add Card</Text>
                </Button>
              </Left>
              <Left>
                <Button iconLeft success>
                  <Icon name="md-play" />
                  <Text>Start Quiz</Text>
                </Button>
              </Left>
            </Body>
          </CardItem>
          <CardItem style={{ paddingVertical: 0 }}>
            <Left>
              <Button transparent>
                <Icon name="md-albums" />
                <Text>{deck.questions.length} cards</Text>
              </Button>
            </Left>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
}

Deck.propTypes = {
  navigation: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Deck;
