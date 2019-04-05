import React from "react";
import axios from "axios";
import { JSON_SERVER } from "../constants";
import { connect } from "react-redux";

import * as _card from "../redux/actions/cardActions";

class NewCard extends React.Component {
  state = {
    title: ""
  }


  handleChangeText = (evt) => {
    this.setState({ title: evt.target.value });
    evt.persist();
  }

  addCard = async(evt) => {
    const { listId, addCard, cardCount } = this.props;
    const { title } = this.state;
    const position = cardCount + 1;

    const cardObj = {
      list_id: listId,
      title,
      description: "",
      position
    }
    // updates the number of cardCount
    const changeListPromise = await axios.patch(JSON_SERVER + `lists/${listId}`, {cardCount: position});
    const changeList = await changeListPromise.data;
    
    if (changeList) {
      const newCard = await axios.post(JSON_SERVER + "cards", {...cardObj});
      const data = await newCard.data;
      addCard(data);
    }

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
  addCard: (val) => dispatch(_card.addCard(val))
});

export default connect(null, mapDispatchToProps)(NewCard);