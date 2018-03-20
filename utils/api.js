import { AsyncStorage } from 'react-native';

const FLASH_CARDS_KEY = 'FlashCards:deck';

const decksMock = [
  {
    title: 'React',
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
    questions: [],
  };
  const newDeckList = [...decksJSON, newDeck];
  AsyncStorage.setItem(FLASH_CARDS_KEY, JSON.stringify(newDeckList));
  return newDeck;
});

