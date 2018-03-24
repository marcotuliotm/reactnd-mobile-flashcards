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
import { saveDeckTitle } from '../../utils/api';


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


class DeckCreate extends Component {
  state ={
    title: '',
    error: false,
    load: false,
  }

  onSaveDeckTitle= () => {
    if (this.state.title === '') {
      this.setState({ error: true });
    } else {
      this.setState({ load: true });
      saveDeckTitle(this.state.title).then((deck) => {
        this.setState({ load: false });
        this.props.navigation.state.params.addDeck(deck);
        this.props.navigation.goBack();
      });
    }
  };


  render() {
    const { title, error, load } = this.state;
    return (
      <Container style={styles.container}>
        <Header>
          <Body>
            <Title>New Deck</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Form >
            <Item error={error} floatingLabel>
              <Label>Title:</Label>
              <Input
                onChangeText={titleIn => this.setState({ title: titleIn })}
                value={title}
              />
            </Item>
            {load ? (<Spinner />) : (
              <Button onPress={this.onSaveDeckTitle} block style={{ margin: 15, marginTop: 50 }}>
                <Text>ADD</Text>
              </Button>
            )}

          </Form>
        </Content>
      </Container>
    );
  }
}


DeckCreate.propTypes = {
  navigation: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default DeckCreate;
