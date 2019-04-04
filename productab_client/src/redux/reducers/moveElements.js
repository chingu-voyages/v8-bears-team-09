// Moves an item from one list to another list.
export const moveCards = (source, destination, cards) => {
  const sourceClone = cards.filter(card => card.list_id === source.droppableId);
  const destClone = cards.filter(card => card.list_id === destination.droppableId);
  const [removed] = sourceClone.splice(source.index, 1);

  // if cards are in the same list
  if (source.droppableId === destination.droppableId) {
    sourceClone.splice(destination.index, 0, removed);
    const filteredCards = cards.filter( el => !sourceClone.includes(el));
    return filteredCards.concat(sourceClone)
  }

  removed.list_id = destination.droppableId
  destClone.splice(destination.index, 0, removed);
  let results = [...sourceClone, ...destClone]
  const filteredCards = cards.filter( el => !results.includes(el));
  return filteredCards.concat(results)
}
