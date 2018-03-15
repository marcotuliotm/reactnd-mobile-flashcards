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

function Deck() {
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
                <Text>NativeBase</Text>
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
                <Text>4 cards</Text>
              </Button>
            </Left>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
}


export default Deck;
