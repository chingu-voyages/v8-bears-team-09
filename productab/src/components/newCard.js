import React from "react";
import axios from "axios";
import { JSON_SERVER } from "../constants";
import { connect } from "react-redux";

import * as _ from "../redux/actions/baseActions";

class NewCard extends React.Component {
  state = {
    description: ""
  }

  handleChangeText = (evt) => {
    this.setState({ description: evt.target.value });
    evt.persist();
  }

  addCard = async(evt) => {
    const { listId, addCard } = this.props;
    const { description } = this.state;

    const cardObj = {
      list_id: listId,
      description
    }

    const newCard = await axios.post(JSON_SERVER + "cards", {...cardObj});
    const data = await newCard.data;
    addCard(data);
    // pass data to the dispatch that adds new card to array of cards for list
    evt.persist();
    evt.preventDefault();
  }

  render() {
    return(<form className="new-card">
      <textarea name="new-card-details" cols="20" rows="3" className="new-card-details" onChange={this.handleChangeText}/>
      <button onClick={this.addCard}>Add Card</button>
    </form>);
  }
}

const mapDispatchToProps = (dispatch) => ({
  addCard: (val) => dispatch(_.addCard(val))
});

export default connect(null, mapDispatchToProps)(NewCard);