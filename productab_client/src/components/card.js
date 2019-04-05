import React from "react";
import { connect } from "react-redux";
import { Draggable } from "react-beautiful-dnd";
import * as _ from "../constants";
import * as _card from "../redux/actions/cardActions";

const Card = (props) => {
  const { title, list_id, id } = props.card;

  function handleClick(evt) {
  const { card, selectCard, deselectCard, modalOn } = props;
    deselectCard();
    selectCard(card);
    modalOn();
    evt.persist();
  }

  return (
    <Draggable draggableId={title + id} index={props.index}>
      {(provided) => (
        <div
          className="card"
          data-card_id={id}
          data-list_id={list_id}
          onClick={handleClick}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="card-settings"><i className="fas fa-pen"/></div>
          <div className="card-title">
          <p className="card-title-contents">{title}</p>
          </div>
        </div>
      )}
  </Draggable>
  );
}

const mapDispatchToProps = (dispatch) => ({
  selectCard: val => dispatch(_card.selectCard(val)),
  deselectCard: () => dispatch(_card.deselectCard()),
  modalOn: () => dispatch({ type: _.MODAL_ON})
});

export default connect(null, mapDispatchToProps)(Card);
