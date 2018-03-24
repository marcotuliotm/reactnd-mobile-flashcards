import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
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
} from 'native-base';
import PropTypes from 'prop-types';
import Card from '../Card';


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


class CardSwiper extends Component {
  state ={

  }


  render() {
    const { cards } = this.props.navigation.state.params;

    return (
      <Container style={styles.container}>
        <Header>

          <Body>
            <Title>Quiz</Title>
          </Body>
          <Right />
        </Header>


        {!cards ? (<Spinner />) : (
          <DeckSwiper
            looping={false}
            dataSource={cards}
            renderItem={data =>
              (
                <Card card={data} />
              )}
            renderEmpty={() =>
                (
                  <View style={{ alignSelf: 'center' }}>
                    <Text>Over</Text>
                  </View>
                )}
          />)}

      </Container>
    );
  }
}


CardSwiper.propTypes = {
  navigation: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default CardSwiper;
