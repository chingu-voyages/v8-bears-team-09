import * as _ from "../../constants";

const initialState = {
  selectedCard: null,
  selectedList: null,
  currentBoard: null, // REFACTOR: use LocalStorage or something to keep or grab this first, the rest of the things should follow
  lists: [],
  cards: [],
  boards: [],
  modalOn: false,
  formsDisabled: false
}

export const base = (state = initialState, {type, payload}) => {
  let selectedCard, selectedList, currentBoard, lists, cards, boards, modalOn, formsDisabled;
  switch(type) {
    // the action creator will access the DB, create a new board and overwrite the collection of lists and return a payload of the updated collection of lists
    case _.ADD_LIST:
      lists = [...state.lists, payload]
      return{...state, lists};

    case _.GET_LISTS:
    case _.UPDATE_LIST:
    case _.REMOVE_LIST: // NOTE: this needs to filter in the action creator not here!!
      lists = payload;
      return {...state, lists};

    case _.ADD_CARD:
      cards = [...state.cards, payload]
      return {...state, cards};

    case _.GET_CARDS:
    case _.REMOVE_CARD:
      cards = payload;
      return {...state, cards};

    case _.SELECT_LIST:
    case _.DESELECT_LIST:
      selectedList = payload;
      return {...state, selectedList};

    case _.SELECT_CARD:
    case _.DESELECT_CARD:
      selectedCard = payload;
      return {...state, selectedCard};

    case _.GET_ALL_BOARDS:
      boards = payload;
      return {...state, boards};
    
    case _.SELECT_BOARD:
    case _.CHANGE_BOARD:
      currentBoard = payload;
      return {...state, currentBoard};

    case _.TOGGLE_MODAL:
      modalOn = payload
      return {...state, modalOn};

    case _.DISABLE_FORMS:
    case _.ENABLE_FORMS:
      formsDisabled = payload;
      return {...state, formsDisabled};
      
    default:
      return state;
  }
}