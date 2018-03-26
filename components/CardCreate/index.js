import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
  Container, Header,
  Title,
  Content,
  Button,
  Text,
  Form, Item, Input, Label,
  Right, Body,
  Spinner,
} from 'native-base';
import PropTypes from 'prop-types';


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


class CardCreate extends Component {
  state ={
    question: '',
    errorQuestion: false,
    answer: '',
    errorAnswer: false,
    load: false,
  }

  onSaveCard= () => {
    const {
      question, answer,
    } = this.state;
    let error = false;
    if (question === '') {
      error = true;
      this.setState({ errorQuestion: true });
    } else {
      this.setState({ errorQuestion: false });
    }

    if (answer === '') {
      error = true;
      this.setState({ errorAnswer: true });
    } else {
      this.setState({ errorAnswer: false });
    }

    if (!error) {
      this.setState({ load: true });
      this.props.navigation.state.params.addCard({ question, answer });
      this.props.navigation.goBack();
    }
  };


  render() {
    const {
      question, answer, errorQuestion, errorAnswer, load,
    } = this.state;
    return (
      <Container style={styles.container}>
        <Header>
          <Body>
            <Title>New Card</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Form >
            <Item error={errorQuestion} floatingLabel>
              <Label>Question:</Label>
              <Input
                onChangeText={value => this.setState({ question: value })}
                value={question}
              />
            </Item>
            <Item error={errorAnswer} floatingLabel>
              <Label>Answer:</Label>
              <Input
                onChangeText={value => this.setState({ answer: value })}
                value={answer}
              />
            </Item>
            {load ? (<Spinner />) : (
              <Button onPress={this.onSaveCard} block style={{ margin: 15, marginTop: 50 }}>
                <Text>ADD</Text>
              </Button>
            )}

          </Form>
        </Content>
      </Container>
    );
  }
}


CardCreate.propTypes = {
  navigation: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default CardCreate;
