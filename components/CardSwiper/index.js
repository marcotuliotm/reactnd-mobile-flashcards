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
import {
  clearLocalNotification,
  setLocalNotification,
} from '../../utils/helpers';


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
    load: false,
    correctCount: 0,
    wrongCount: 0,
    deckSwiper: null,
    isSee: false,
    restCount: 0,
  }


  componentWillMount() {
    clearLocalNotification().then(setLocalNotification);
    this.setState({
      deckSwiper: this.buildDeckSwiper(),
      restCount: this.props.navigation.state.params.cards.length - 1,
    });
  }

  onSee = () => this.setState({ isSee: true });

  onCorrect = () => {
    this.onSwipeRight();
    this._deckSwiper._root.swipeRight();  // eslint-disable-line
  }

  onWrong = () => {
    this.onSwipeLeft();
    this._deckSwiper._root.swipeLeft();  // eslint-disable-line
  }

  onSwipeRight = () => {
    let { correctCount, restCount } = this.state;
    correctCount += 1;
    if (restCount > 0) { restCount -= 1; }
    this.setState({ correctCount, isSee: false, restCount });
  }

  onSwipeLeft = () => {
    let { wrongCount, restCount } = this.state;
    wrongCount += 1;
    if (restCount > 0) { restCount -= 1; }
    this.setState({ wrongCount, isSee: false, restCount });
  }

  onRestart= () => {
    this.setState({ load: true, deckSwiper: null });
    setTimeout(() => {
      this.setState({
        load: false,
        deckSwiper: this.buildDeckSwiper(),
        correctCount: 0,
        wrongCount: 0,
        restCount: this.props.navigation.state.params.cards.length - 1,
      });
    }, 1000);
  }

  buildDeckSwiper = () => (
    <DeckSwiper
      ref={c => this._deckSwiper = c}  // eslint-disable-line
      looping={false}
      onSwipeRight={this.onSwipeRight}
      onSwipeLeft={this.onSwipeLeft}
      dataSource={this.props.navigation.state.params.cards}
      renderItem={data =>
              (
                <CardView
                  card={data}
                  isSee={this.state.isSee}
                  onSee={this.onSee}
                  onCorrect={this.onCorrect}
                  onWrong={this.onWrong}
                  restCount={this.state.restCount}
                />
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
                          <Text>Incorrect: {this.state.wrongCount}</Text>
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
    const { deckSwiper, load } = this.state;

    return (
      <Container style={styles.container}>
        <Header>
          <Body>
            <Title>Quiz</Title>
          </Body>
          <Right />
        </Header>
        {load ? (<Spinner />) : (
          deckSwiper)}
      </Container>
    );
  }
}


CardSwiper.propTypes = {
  navigation: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default CardSwiper;
