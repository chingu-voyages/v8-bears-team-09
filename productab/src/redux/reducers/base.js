import * as _ from "../../constants";

const initialState = {
  selectedCard: null,
  selectedList: null,
  selectedWorkspace: null,
  boards: [],
  cards: [],
  workspaces: [],
  modalOn: false,
  formsDisabled: false
}

export const base = (state = initialState, {type, payload}) => {
  let selectedCard, selectedList, selectedWorkspace, boards, cards, workspaces, modalOn, formsDisabled;
  switch(type) {
    // the action creator will access the DB, create a new board and overwrite the collection of boards and return a payload of the updated collection of boards
    case _.ADD_LIST:
      boards = [...state.boards, payload]
      return{...state, boards};

    case _.GET_LISTS:
    case _.CHANGE_LISTS:
    case _.REMOVE_LIST:
      boards = [...payload];
      return {...state, boards};

    case _.ADD_CARD:
      cards = [...state.cards, payload]
      return {...state, cards};

    case _.GET_CARDS:
    case _.CHANGE_CARDS:
    case _.REMOVE_CARD:
      cards = [...payload];
      return {...state, cards};

    case _.SELECT_LIST:
    case _.DESELECT_LIST:
      selectedList = payload;
      return {...state, selectedList};

    case _.SELECT_CARD:
    case _.DESELECT_CARD:
      selectedCard = payload;
      return {...state, selectedCard};

    case _.GET_ALL_WORKSPACE:
      workspaces = [...payload];
      return {...state, workspaces};
    
    case _.SELECT_WORKSPACE:
    case _.CHANGE_WORKSPACE:
      selectedWorkspace = payload;
      return {...state, selectedWorkspace};

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