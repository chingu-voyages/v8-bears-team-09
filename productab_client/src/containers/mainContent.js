import React from "react";
import { connect } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";

import List from "./list";
import NewList from "../components/newList";
import * as _base from "../redux/actions/baseActions";
import * as _list from "../redux/actions/listActions";
import * as _card from "../redux/actions/cardActions";
import "../_stylesheet/components.scss";

class MainContent extends React.Component {
  state = {

  }

  componentDidMount () {
    const { getLists, getCards } = this.props;
    getLists(1)
    .then(() => getCards(this.props.lists))
  }

  componentDidUpdate(prevProps) {
    const { getLists } = this.props;
    if(prevProps !== this.props) {
      if (prevProps.list !== this.props.list) {
        getLists(1);
      }
    }
  }

  handleBlurClick = (evt) => {
    const { disableForms, deselectList } = this.props;
    const targetId = evt.target.id;

    if (targetId === "main-content" || targetId === "inner-content")
    {
      disableForms();
      deselectList();
    }
    evt.persist();
    evt.preventDefault();
  }

  /* Returns array of current board's lists as React Components to be rendered */
  showLists = () => {
    const { lists } = this.props;
    let showLists = lists.map(list => <List position={list.position} key={`Board. ${list.board_id} - No. ${list.id}`} list={list}/>);
    showLists.sort((a,b) => a.props.position - b.props.position);
    return showLists;
  }

  reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  onDragEnd = (result) => {
    console.log("result", result.type)
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    if (result.type === "CARDS") {
      this.props.moveCard(result);
    }

    // const cards = this.reorder(
    //   this.props.cards,
    //   result.source.index,
    //   result.destination.index
    // );
    //
    // this.props.updateCards(cards)
  }

  render() {
    return(<div id="main-content" onClick={this.handleBlurClick}>
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div id="inner-content">
          {this.showLists()}
          <NewList/>
        </div>
      </DragDropContext>
    </div>);
  }
}

const mapStateToProps = (state) =>  ({
  lists: state.list.lists,
  cards: state.card.cards
});


const mapDispatchToProps = (dispatch) => ({
  disableForms: () => dispatch(_base.disableForms()),
  getLists: (boardId) => dispatch(_list.getLists(boardId)),
  getCards: (cards) => dispatch(_card.getCards(cards)),
  moveCard: (cards) => dispatch(_card.moveCard(cards)),
  updateCards: val => dispatch(_card.updateCards(val)),
  deselectList: () => dispatch(_list.deselectList())
});

export default connect(mapStateToProps, mapDispatchToProps)(MainContent);
