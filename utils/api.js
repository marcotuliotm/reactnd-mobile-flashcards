import { AsyncStorage } from 'react-native';

const FLASH_CARDS_KEY = 'FlashCards:deck';

const decksMock = [
  {
    title: 'React',
    result: '1/2',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces',
      },
      {
        question: 'Where do you make AJAX requests in React?',
        answer: 'The componentDidMount lifecycle event',
      },
    ],
  },
  {
    title: 'Javascript',
    result: '',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.',
      },
    ],
  },
];

export const getDecks = () => AsyncStorage.getItem(FLASH_CARDS_KEY).then((data) => {
  if (JSON.parse(data) !== null) {
    return JSON.parse(data);
  }

  AsyncStorage.setItem(FLASH_CARDS_KEY, JSON.stringify(decksMock));
  return AsyncStorage.getItem(FLASH_CARDS_KEY).then(dataMock => JSON.parse(dataMock));
});

export const getDeck = title => AsyncStorage.getItem(FLASH_CARDS_KEY).then((decks) => {
  const decksJSON = JSON.parse(decks) || [];
  return decksJSON.find(deck => deck.title === title);
});

export const saveDeckTitle = title => AsyncStorage.getItem(FLASH_CARDS_KEY).then((decks) => {
  const decksJSON = JSON.parse(decks) || [];
  const newDeck = {
    title,
    result: '',
    questions: [],
  };
  const newDeckList = [...decksJSON, newDeck];
  AsyncStorage.setItem(FLASH_CARDS_KEY, JSON.stringify(newDeckList));
  return newDeck;
});

export const saveCard = (title, question) => AsyncStorage.getItem(FLASH_CARDS_KEY)
  .then((decks) => {
    const decksJSON = JSON.parse(decks) || [];
    const newDeckList = decksJSON.map((deck) => {
      if (deck.title === title) {
        deck.questions.push(question);
      }
      return deck;
    });
    AsyncStorage.setItem(FLASH_CARDS_KEY, JSON.stringify(newDeckList));
  });

export const saveResult = (title, result) => AsyncStorage.getItem(FLASH_CARDS_KEY)
  .then((decks) => {
    const decksJSON = JSON.parse(decks) || [];
    const newDeckList = decksJSON.map((deck) => {
      if (deck.title === title) {
        deck.result = result; // eslint-disable-line
      }
      return deck;
    });
    AsyncStorage.setItem(FLASH_CARDS_KEY, JSON.stringify(newDeckList));
  });
