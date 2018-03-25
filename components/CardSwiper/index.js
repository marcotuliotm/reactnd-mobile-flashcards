import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import {
  Container,
  Header,
  Title,
  View,
  Text,
  Right,
  Body,
  Spinner,
  DeckSwiper,
  CardItem,
  Left,
  Icon,
  Button,
} from 'native-base';
import PropTypes from 'prop-types';
import CardView from '../Card';

const deviceHeight = Dimensions.get('window').height;


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
  restart: {
    flex: 1,
    justifyContent: 'center',
    height: deviceHeight / 4,
  },
});


class CardSwiper extends Component {
  state ={
    isAnswered: false,
    correctCount: 0,
    wrongCount: 0,
    deckSwiper: null,
  }


  componentWillMount() {
    this.setState({ deckSwiper: this.buildDeckSwiper() });
  }

  onAnswered=() => {
    const { isAnswered } = this.state;
    this.setState({ isAnswered: !isAnswered });
  }

  onSwipeRight = () => {
    let { correctCount } = this.state;
    correctCount += 1;
    this.setState({ correctCount });
  }

  onSwipLeft = () => {
    let { wrongCount } = this.state;
    wrongCount += 1;
    this.setState({ wrongCount });
  }

  onRestart= () => {
    this.setState({ isAnswered: true, deckSwiper: null });
    setTimeout(() => {
      this.setState({
        isAnswered: false,
        deckSwiper: this.buildDeckSwiper(),
        correctCount: 0,
        wrongCount: 0,
      });
    }, 1000);
  }

  buildDeckSwiper = () => (
    <DeckSwiper
      looping={false}
      onSwipeRight={this.onSwipeRight}
      onSwipeLeft={this.onSwipLeft}
      dataSource={this.props.navigation.state.params.cards}
      renderItem={data =>
              (
                <CardView card={data} />
              )}
      renderEmpty={() =>
                (
                  <View>

                    <CardItem bordered>
                      <Body>
                        <Text style={styles.text}>Quiz result:</Text>
                      </Body>
                    </CardItem>

                    <CardItem bordered>
                      <Left>
                        <Button iconLeft success >
                          <Icon name="md-checkmark" />
                          <Text >Correct: {this.state.correctCount}</Text>
                        </Button>
                      </Left>
                      <Right>
                        <Button iconLeft danger >
                          <Icon name="md-close" />
                          <Text>Wrong: {this.state.wrongCount}</Text>
                        </Button>
                      </Right>
                    </CardItem>

                    <CardItem bordered>
                      <Body>
                        <Text style={styles.text}>What do you want?</Text>
                      </Body>
                    </CardItem>
                    <CardItem >
                      <Left>
                        <Button iconLeft primary onPress={() => this.props.navigation.goBack()}>
                          <Icon name="arrow-back" />
                          <Text >Go back</Text>
                        </Button>
                      </Left>
                      <Right>
                        <Button iconLeft onPress={this.onRestart}>
                          <Icon name="md-repeat" />
                          <Text>restart quiz</Text>
                        </Button>
                      </Right>
                    </CardItem>
                  </View>
                )}
    />
  );


  render() {
    const { deckSwiper, isAnswered } = this.state;

    return (
      <Container style={styles.container}>
        <Header>
          <Body>
            <Title>Quiz</Title>
          </Body>
          <Right />
        </Header>
        {isAnswered ? (<Spinner />) : (
          deckSwiper)}
      </Container>
    );
  }
}


CardSwiper.propTypes = {
  navigation: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default CardSwiper;
