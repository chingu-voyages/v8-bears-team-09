import * as _ from "../../constants";

const initialState = {
  currentBoard: null, // REFACTOR: use LocalStorage or something to keep or grab this first, the rest of the things should follow
  boards: [],
  modalOn: false,
  formsDisabled: false
}

export const base = (state = initialState, {type, payload}) => {
  let currentBoard, boards, modalOn, formsDisabled;
  switch(type) {

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