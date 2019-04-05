import * as _ from "../../constants";
import { JSON_SERVER } from "../../constants";
import axios from "axios";

export const addList = (listObj) => {
  return async(dispatch) => {
    const newList = await axios.post(JSON_SERVER + "lists", {...listObj});
    const data = await newList.data;
    dispatch({ type: _.ADD_LIST, payload: data });
  }
}

export const removeList = (listId) => {
  // TODO: access DB, remove the board with same id that was passed, get the returned list of boards to pass to payload
  return async(dispatch) => {
    const removedList = await axios.delete(JSON_SERVER + `lists\${listId}`);
    const deleteData = await removedList.data;

    if (Object.keys(deleteData).length === 0) {
      const remaining = await axios.get(JSON_SERVER + "lists");
      const remainingLists = await remaining.data;
      dispatch({ type: _.REMOVE_LIST, payload: remainingLists });
    }
  }
}

export const selectList = (listObj) => {
  return (dispatch) =>  dispatch({ type: _.SELECT_LIST, payload: listObj });
}

export const deselectList = () => {
  return (dispatch) => dispatch({ type: _.DESELECT_LIST, payload: null });
}

export const getLists = (boardId) => {
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

export const moveList = (list) => dispatch => {
  dispatch({ type: _.MOVE_LIST, payload: list})
}
