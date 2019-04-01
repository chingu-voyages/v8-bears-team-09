import React from "react";
import { connect } from "react-redux";

const Modal = (props) => {
  return(<div id="modal">
      {props.children}
  </div>);
}

// Make the children contextual maybe a switch operation
const _Modal = (props) => {
  return(<Modal>

  </Modal>);
}

export default connect()(_Modal);