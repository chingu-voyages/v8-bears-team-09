import * as _ from "../../constants";

const initialState = {
  currentBoard: null, // REFACTOR: use LocalStorage or something to keep or grab this first, the rest of the things should follow
  boards: [],
  modalOn: false,
  formsDisabled: false,
  cardMembers: [],
  currentUser: null
}

export const base = (state = initialState, {type, payload}) => {
  let currentBoard, boards, modalOn, formsDisabled, cardMembers;
  switch(type) {

    case _.GET_ALL_BOARDS:
      boards = payload;
      return {...state, boards};
    
    case _.SELECT_BOARD:
    case _.CHANGE_BOARD:
      currentBoard = payload;
      return {...state, currentBoard};

    case _.MODAL_OFF:
      modalOn = false;
      return {...state, modalOn};

    case _.MODAL_ON:
      modalOn = true;
      return {...state, modalOn};

    case _.DISABLE_FORMS:
    case _.ENABLE_FORMS:
      formsDisabled = payload;
      return {...state, formsDisabled};

    case _.GET_CARD_MEMBERS:
    case _.REMOVE_CARD_MEMBER:
      cardMembers = payload;
      return {...state, cardMembers};

    case _.ADD_CARD_MEMBER:
      cardMembers = [...state.cardMembers, payload];
      return {...state, cardMembers};
      
    default:
      return state;
  }
}