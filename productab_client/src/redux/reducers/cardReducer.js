import * as _ from "../../constants";
import { moveCards } from "./moveElements";

const initialState = {
  selectedCard: null,
  cards: []
}

export const card = (state = initialState, {type, payload}) => {
  let cards, selectedCard;
  switch(type) {
    case _.ADD_CARD:
      cards = [...state.cards, payload]
      return {...state, cards};

    case _.GET_CARDS:
    case _.REMOVE_CARD:
      cards = payload;
      return {...state, cards};

    case _.SELECT_CARD:
    case _.UPDATE_CARD:
    case _.DESELECT_CARD:
      selectedCard = payload;
      return {...state, selectedCard};

    case _.MOVE_CARD:
      if (payload.source && payload.destination) {
        const cards = moveCards(
          payload.source,
          payload.destination,
          state.cards
        );
        return { ...state, cards };
      }

    default:
      return state;
  }
}
