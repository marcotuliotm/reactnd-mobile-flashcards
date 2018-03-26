import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import {
  Button,
  Icon,
  Card,
  CardItem,
  Text,
  Thumbnail,
  Left,
  Body,
  View,
} from 'native-base';
import PropTypes from 'prop-types';


const deviceHeight = Dimensions.get('window').height;
const cardImage = require('../../assets/card.png');


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
  card: {
    flex: 1,
    justifyContent: 'center',
    height: deviceHeight / 7,
  },
});

function CardView(props) {
  const {
    card,
    isSee,
    onCorrect,
    onWrong,
    onSee,
    restCount,
  } = props;

  return (
    <Card style={styles.mb}>
      <CardItem bordered>
        <Left>
          <Thumbnail small source={cardImage} />
          <Body>
            <Text note>Question:</Text>
            <Text>{card.question}</Text>
          </Body>
        </Left>
      </CardItem>
      {isSee ? (
        <View>
          <CardItem style={styles.cardMain}>
            <Body >
              <Text note>Answer:</Text>
              <Text>{card.answer}</Text>
            </Body>
          </CardItem>
          <CardItem style={styles.cardMain}>
            <Body >
              <Left>
                <Button iconLeft success onPress={onCorrect}>
                  <Icon name="md-checkmark" />
                  <Text>Correct</Text>
                </Button>
              </Left>
              <Left>
                <Button iconLeft danger onPress={onWrong}>
                  <Icon name="md-close" />
                  <Text>Incorrect</Text>
                </Button>
              </Left>
            </Body>
          </CardItem>
        </View>
            ) : (
              <View>
                <CardItem style={styles.cardMain} />
                <CardItem style={styles.cardMain}>
                  <Button iconRight info onPress={onSee}>
                    <Text>Show Answer</Text>
                    <Icon name="md-help" />
                  </Button>
                </CardItem>
              </View>
            )}
      <CardItem style={{ paddingVertical: 0 }}>
        <Left>
          <Button transparent>
            <Icon name="md-albums" />
            <Text>{restCount} cards remain</Text>
          </Button>
        </Left>
      </CardItem>
    </Card>

  );
}


CardView.propTypes = {
  card: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  isSee: PropTypes.bool.isRequired,
  onSee: PropTypes.func.isRequired,
  onCorrect: PropTypes.func.isRequired,
  onWrong: PropTypes.func.isRequired,
  restCount: PropTypes.number.isRequired,
};

export default CardView;
