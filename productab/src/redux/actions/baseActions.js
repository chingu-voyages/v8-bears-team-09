import * as _ from "../../constants";
import { JSON_SERVER } from "../../constants";
// eslint-disable-next-line no-unused-vars
import axios from "axios";

export const addList = (listObj) => {
  return async(dispatch) => {
    const newList = await axios.post(JSON_SERVER + "lists", {...listObj});
    const data = await newList.data;
    dispatch({ type: _.ADD_LIST, payload: data });
  }
}

export const removeList = (listId) => {
  axios.delete(JSON_SERVER + `lists`)
  // TODO: access DB, remove the board with same id that was passed, get the returned list of boards to pass to payload
  return (dispatch) => dispatch({ type: _.REMOVE_LIST, payload: undefined })
}

export const addCard = (newCard) => {
  return (dispatch) => {
    dispatch({ type: _.ADD_CARD, payload: newCard })
  }
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

export const getLists = (boardId) => {
  // TODO: accesses the DB, fetches lists that belong to the current workspace, wh/ is identified by its ID
  return async(dispatch) => {
    const lists = await axios.get(JSON_SERVER + "lists");
    const data = await lists.data;
    let filteredLists = data.filter(list => {
      if (list.board_id === boardId) {
        return list;
      }
    });
    dispatch({ type: _.GET_LISTS, payload: filteredLists });
  }
}

export const getCards = () => {
  // TODO: accesses the DB, fetches cards that belong to the current workspace, wh/ is identified by its ID
  return async(dispatch) => {
    const cardPromise = await axios.get(JSON_SERVER + "cards");
    const cards = await cardPromise.data;
    dispatch({ type: _.GET_CARDS, payload: cards })
  }
}

// NOTE: the userId is a placeholder, upon a working back end, there will be a change
export const getAllBoards = (user=undefined) => {
  // TODO: gets all the workspaces
}
/* 
DISABLE_FORMS
ENABLE_FORMS 
*/
export const disableForms = () => {
  return (dispatch) => dispatch({ type: _.DISABLE_FORMS, payload: true})
}

export const enableForms = () => {
  return (dispatch) => dispatch({ type: _.ENABLE_FORMS, payload: false})
}
