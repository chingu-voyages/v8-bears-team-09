import React from "react";
import { connect } from "react-redux";

import * as _ from "../redux/actions/baseActions";

class NewCard extends React.Component {
  state = {

  }

  render() {
    return(<form className="new-card">
      <textarea name="new-card-details" cols="20" rows="3" className="new-card-details"/>
      <button>Add Card</button>
    </form>);
  }
}

export default NewCard;