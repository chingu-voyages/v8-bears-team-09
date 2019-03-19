import * as _ from "../../constants";
// eslint-disable-next-line no-unused-vars
import axios from "axios";

export const addList = (listObj) => {
  // TODO: access DB, add the board object to be passed, get the returned list of boards to pass to payload
  return (dispatch) => dispatch({ type: _.ADD_LIST, payload: undefined })
}

export const removeList = (listId) => {
  // TODO: access DB, remove the board with same id that was passed, get the returned list of boards to pass to payload
  return (dispatch) => dispatch({ type: _.REMOVE_LIST, payload: undefined })
}

export const addCard = (cardObj) => {
  // TODO: access DB, add the board object to be passed, get the returned list of cards to pass to payload
  return (dispatch) => dispatch({ type: _.ADD_CARD, payload: undefined })
}

export const removeCard = (cardId) => {
  // TODO: access DB, remove the board with same id that was passed, get the returned list of cards to pass to payload
  return (dispatch) => dispatch({ type: _.REMOVE_CARD, payload: undefined })
}

export const selectList = (listObj) => {
  return (dispatch) =>  dispatch({ type: _.SELECT_LIST, payload: listObj });
}

export const selectCard = (cardObj) => {
  return (dispatch) =>  dispatch({ type: _.SELECT_CARD, payload: cardObj });
}

export const deselectList = () => {
  return (dispatch) => dispatch({ type: _.DESELECT_LIST, payload: null });
}

export const deselectCard = () => {
  return (dispatch) => dispatch({ type: _.DESELECT_CARD, payload: null });
}

export const getLists = (workspaceId) => {
  let boards;
  // TODO: accesses the DB, fetches boards that belong to the current workspace, wh/ is identified by its ID
  return (dispatch) => dispatch({ type: _.GET_LISTS, payload: boards })
}

export const getCards = (workspaceId) => {
  let cards;
  // TODO: accesses the DB, fetches cards that belong to the current workspace, wh/ is identified by its ID
  return (dispatch) => dispatch({ type: _.GET_CARDS, payload: cards })
}

// NOTE: the userId is a placeholder, upon a working back end, there will be a change
export const getAllWorkspaces = (user=undefined) => {
  // TODO: gets all the workspaces
}
