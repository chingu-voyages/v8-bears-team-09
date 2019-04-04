import * as _ from "../../constants";
import { JSON_SERVER } from "../../constants";
import axios from "axios";

export const addCard = (newCard) => {
  return (dispatch) => {
    dispatch({ type: _.ADD_CARD, payload: newCard });
  }
}

export const removeCard = (cardId) => {
  // TODO: access DB, remove the board with same id that was passed, get the returned list of cards to pass to payload
  return (dispatch) => dispatch({ type: _.REMOVE_CARD, payload: undefined });
}

export const selectCard = (cardObj) => {
  return (dispatch) =>  dispatch({ type: _.SELECT_CARD, payload: cardObj });
}

export const deselectCard = () => {
  return (dispatch) => dispatch({ type: _.DESELECT_CARD, payload: null });
}

export const getCards = (lists) => {
  // TODO: accesses the DB, fetches cards that belong to the current workspace, wh/ is identified by its ID
  return async(dispatch) => {
    const cardPromise = await axios.get(JSON_SERVER + "cards");
    const cards = await cardPromise.data;
    dispatch({ type: _.GET_CARDS, payload: cards })
  }
}

export const updateCards = (cards) => dispatch => {
  dispatch({ type: _.GET_CARDS, payload: cards })
}

export const moveCard = (card) => dispatch => {
  dispatch({ type: _.MOVE_CARD, payload: card})
}
