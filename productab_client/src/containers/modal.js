import React from "react";
import { connect } from "react-redux";

import * as _ from "../constants";
import "../_stylesheet/modal.scss";

const Modal = (props) => {
  const { closeModal } = props;
  function handleOOBClick(evt) {
    if (evt.target.id === "modal") {
      closeModal();
    }
  }

  return(<div id="modal" onClick={handleOOBClick}>
      {props.children}
  </div>);
}

const mapStateToProps = (state) => ({
  selectedCard: state.card.selectedCard
});

const mapDispatchToProps = (dispatch) => ({
  closeModal: () => dispatch({ type: _.MODAL_OFF})
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);