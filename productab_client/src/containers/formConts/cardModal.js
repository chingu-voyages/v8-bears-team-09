import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";

const CardModal = (props) => {
  const { title } = props.selectedCard;
  const [ cardTitle, setTitle ] = useState(title);

  return(<div id="card-modal">

  </div>)
}

const mapStateToProps = state => ({
  selectedCard: state.card.selectedCard
});

export default connect(mapStateToProps)(CardModal);