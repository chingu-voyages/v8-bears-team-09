import React from "react";
import { connect } from "react-redux";
import { selectCard, deselectCard } from "../redux/actions/cardActions";

const Card = (props) => {
  const { title, list_id, id } = props.card;
  
  function handleClick(evt) {
  const { card } = props;

    evt.persist();
  }

  return (<div className="card" data-card_id={id} data-list_id={list_id} onClick={handleClick}>
    <div className="card-settings"><i className="fas fa-pen"/></div>
    <div className="card-title">
      <p className="card-title-contents">{title}</p>
    </div>
  </div>);
}

const mapDispatchToProps = (state) => {

};

export default connect(null, mapDispatchToProps)(Card);