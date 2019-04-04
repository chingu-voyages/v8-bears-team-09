import * as _ from "../../constants";

const reorder = (cards, startIndex, endIndex) => {
    const result = Array.from(cards);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

// Moves an item from one list to another list.
const move = (source, destination, cards) => {
  // if (source.droppableId === destination.droppableId) {
  //   const result = Array.from(cards);
  //   const [removed] = result.splice(source.index, 1);
  //   result.splice(destination.index, 0, removed);
  //   return result;
  // }
    const sourceClone = cards.filter(card => card.list_id === source.droppableId);
    const destClone = cards.filter(card => card.list_id === destination.droppableId);
    const [removed] = sourceClone.splice(source.index, 1);
    removed.list_id = destination.droppableId
    destClone.splice(destination.index, 0, removed);
    let results = [...sourceClone, ...destClone]
    return results;
};

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
        const cards = move(
          payload.source,
          payload.destination,
          state.cards
        );
      console.log("cards", cards)
      return { ...state, ...cards };
      }

    default:
      return state;
  }
}
