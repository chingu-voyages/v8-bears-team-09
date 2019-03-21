import React from "react";
import axios from "axios";

import { JSON_SERVER } from "../constants";
import Card from "../components/card";
import NewCard from "../components/newCard";
import * as _ from "../redux/actions/baseActions";

import { connect } from "react-redux";

class List extends React.Component {
  state = {
    cardFormOn: false,
    title: "",
    description: "",
    info: "",
    listCards: []
  }

  componentDidMount() {
    let { cards } = this.props;
    const { title, id } = this.props.list;
    this.setState({title}, () =>{
      const listCards = cards.filter(card => {
        if ( card.list_id === id) {
          return card
        }
      })
      this.setState({listCards});
    });
  }

  componentDidUpdate(prevProps) {
    const { formsDisabled, cards, list } = this.props;
    const { cardFormOn } = this.state;
    
    if (prevProps !== this.props) {
      if (prevProps.cards !== cards) {
        const listCards = cards.filter(card => {
          if ( card.list_id === list.id) {
            return card
          }
        })
        this.setState({listCards});
      }

      if (formsDisabled && cardFormOn) {
        this.setState({cardFormOn: false});
      }
    }
  }

  handleAddCard = (evt) => {
    this.props.disableForms();
    this.props.enableForms();
    this.setState({cardFormOn: !this.state.cardFormOn});
    this.props.disableForms();
    evt.persist();
    evt.preventDefault();
  }
  
  handleTitleChange = (evt) => {
    this.setState({ title: evt.target.value})
    evt.persist();
  }

  /* filters for it's own cards and returns an array */
  showCards = () => {
    let { cards } = this.props;
    const { id } = this.props.list;

    const myCards = cards.filter(card => {
      if (card.list_id === id) {
        return card
      }
    }).map(card => <Card key={`ID. ${card.id} - List: ${id}`} card={card}/>)
    return myCards;
  }

  /* Updates the DB's title of the current list being edited when focus is blurred */
  handleTitleBlur = async(evt) => {
    const { title } = this.state;
    const { id } = this.props.list;
    const updateList = await axios.patch(JSON_SERVER +`lists/${id}`, {title});
    const data = await updateList.data;
    this.setState({title: data.title})
    evt.persist();
  }
  
  handleListOptions = (evt) => {
    // alert('options button was pressed');
    evt.persist();
  }

  render() {
    const { cardFormOn, title } = this.state;
    const { id } = this.props.list;

    return(<div className="list-style list-sizing shrink-container ">
    <div className="list-top">

      <textarea draggable={false} name="list-title" className="list-title" value={title} onChange={this.handleTitleChange} onBlur={this.handleTitleBlur} rows="1"/>

      <i className="fas fa-ellipsis-h" onClick={this.handleListOptions}/>
    </div>
    <div className="inner-list">
      {this.showCards()}
    </div>
    <div className="list-bottom">

      {cardFormOn ? 
        <NewCard listId={id}/> :
        <><i className="fas fa-plus" onClick={this.handleAddCard}/>
        <span onClick={this.handleAddCard}>Add Card</span></>
      }
    </div>
  </div>);
  }
}

const mapStateToProps = (state) => ({
  formsDisabled: state.base.formsDisabled,
  cards: state.base.cards
});

const mapDispatchToProps = (dispatch) => ({
  addCard: (val) => dispatch(_.addCard(val)),
  enableForms: () => dispatch(_.enableForms()),
  disableForms: () => dispatch(_.disableForms())
});

export default connect(mapStateToProps, mapDispatchToProps)(List);