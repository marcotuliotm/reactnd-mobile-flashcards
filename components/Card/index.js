import React from 'react';
import { StyleSheet, Image, Dimensions } from 'react-native';
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

const deviceWidth = Dimensions.get('window').width;
const logo = require('../../assets/logo-dark.png');
const cardImage = require('../../assets/shadow.png');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
  },
  mb: {
    marginBottom: 15,
  },
});

function CardView(props) {
  return (
    <Container style={styles.container}>
      <Header>
        <Left>
          <Button transparent onPress={() => props.navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Card Showcase</Title>
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

          <CardItem>
            <Body>
              <Image
                style={{
                    alignSelf: 'center',
                    height: 150,
                    resizeMode: 'cover',
                    width: deviceWidth / 1.18,
                    marginVertical: 5,
                  }}
                source={cardImage}
              />
              <Text>
                  NativeBase is a free and source framework that enable
                  developers to build high-quality mobile apps using React
                  Native iOS and Android apps with a fusion of ES6. NativeBase
                  builds a layer on top of React Native that provides you with
                  basic set of components for mobile application development.
              </Text>
            </Body>
          </CardItem>
          <CardItem style={{ paddingVertical: 0 }}>
            <Left>
              <Button transparent>
                <Icon name="logo-github" />
                <Text>4,923 stars</Text>
              </Button>
            </Left>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
}

CardView.propTypes = {
  navigation: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default CardView;
