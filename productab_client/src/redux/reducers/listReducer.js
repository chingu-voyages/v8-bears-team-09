import * as _ from "../../constants";
import { moveLists } from "./moveElements";

const initialState = {
  selectedList: null,
  lists: []
};

export const list = (state = initialState, { type, payload }) => {
  let selectedList, lists;

  switch (type) {
    case _.ADD_LIST:
      lists = [...state.lists, payload];
      return { ...state, lists };

    case _.GET_LISTS:
    case _.UPDATE_LIST:
    case _.REMOVE_LIST: // NOTE: this needs to filter in the action creator not here!!
      lists = payload;
      return { ...state, lists };

    case _.SELECT_LIST:
    case _.DESELECT_LIST:
      selectedList = payload;
      return { ...state, selectedList };

    case _.MOVE_LIST:
      if (payload.source === null || payload.destination === null) {
        return state;
      } else {
        const lists = moveLists(
          payload.source.index,
          payload.destination.index,
          state.lists
        )
        return { ...state, lists };
      }

    default:
      return state;
  }
};
