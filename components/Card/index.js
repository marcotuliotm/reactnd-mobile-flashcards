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
});

class CardView extends React.Component {
  state ={
    isSee: false,
  }

  onSee = () => this.setState({ isSee: true });

  onCorrect = () => this.setState({ isSee: false });

  onWrong = () => this.setState({ isSee: false });


  render() {
    const { isSee } = this.state;
    const { card } = this.props;
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
                  <Button iconLeft success onPress={this.onCorrect}>
                    <Icon name="md-checkmark" />
                    <Text>Correct</Text>
                  </Button>
                </Left>
                <Left>
                  <Button iconLeft danger onPress={this.onWrong}>
                    <Icon name="md-close" />
                    <Text>Wrong</Text>
                  </Button>
                </Left>
              </Body>
            </CardItem>
          </View>
            ) : (
              <View>
                <CardItem style={styles.cardMain} />
                <CardItem style={styles.cardMain}>
                  <Button iconRight info onPress={this.onSee}>
                    <Text>See answer</Text>
                    <Icon name="md-help" />
                  </Button>
                </CardItem>
              </View>
            )}
      </Card>

    );
  }
}

CardView.propTypes = {
  card: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default CardView;
