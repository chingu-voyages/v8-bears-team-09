import React from "react";
import Card from "../components/card";
import NewCard from "../components/newCard";
import * as _ from "../redux/actions/baseActions";

import { connect } from "react-redux";

class List extends React.Component {
  state = {
    cardFormOn: false
  }

  handleAddCard = (evt) => {
    // this.props.disableForms();
    this.props.enableForms();
    this.setState({cardFormOn: !this.state.cardFormOn});
    evt.persist();
  }
  
  handleTitleChange = (evt) => {
    alert(`You wrote ${evt.target.value}`);
    evt.persist();
  }
  
  handleListOptions = (evt) => {
    alert('options button was pressed');
    evt.persist();
  }

  render() {
    const { cardFormOn } = this.state;

    return(<div className="list-style list-sizing shrink-container ">
    <div className="list-top">
      <textarea draggable={false} name="list-title" className="list-title" placeholder="Title" onBlur={this.handleTitleChange} rows="1"/>
      <i className="fas fa-ellipsis-h" onClick={this.handleListOptions}/>
    </div>
    <div className="inner-list">
      {/* Cards go here!! */}
    </div>
    <div className="list-bottom">

      {cardFormOn ? 
        <NewCard/> :
        <><i className="fas fa-plus" onClick={this.handleAddCard}/>
        <span onClick={this.handleAddCard}>Add Card</span></>
        
      }
    </div>
  </div>);
  }
}

const mapStateToProps = (state) => ({
  formsDisabled: state.base.formsDisabled
});

const mapDispatchToProps = (dispatch) => ({
  addCard: (val) => dispatch(_.addCard(val)),
  enableForms: () => dispatch(_.enableForms()),
  disableForms: () => dispatch(_.disableForms())
});

export default connect(mapStateToProps, mapDispatchToProps)(List);