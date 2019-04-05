import React from "react";
import { connect } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import List from "./list";
import NewList from "../components/newList";
import * as _base from "../redux/actions/baseActions";
import * as _list from "../redux/actions/listActions";
import * as _card from "../redux/actions/cardActions";
import "../_stylesheet/components.scss";

class MainContent extends React.Component {

  componentDidMount () {
    const { getLists, getCards } = this.props;
    getLists(1)
    getCards()
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
    let showLists = lists.map((list, index) => <List position={list.position} key={`Board. ${list.board_id} - No. ${list.id}`} list={list} index={index}/>);
    // showLists.sort((a,b) => a.props.position - b.props.position);
    return showLists;
  }

  onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    if (result.type === "CARDS") {
      this.props.moveCard(result);
    }

    if (result.type === "COLUMNS") {
      this.props.moveList(result)
    }
  }

  render() {
    return(<div id="main-content" onClick={this.handleBlurClick}>
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable
          droppableId="board"
          direction="horizontal"
          type="COLUMNS"
        >
          {(provided) => (
            <div
              id="inner-content"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {this.showLists()}
              <NewList/>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
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
  moveList: (list) => dispatch(_list.moveList(list)),
  getCards: () => dispatch(_card.getCards()),
  moveCard: (card) => dispatch(_card.moveCard(card)),
  updateCards: val => dispatch(_card.updateCards(val)),
  deselectList: () => dispatch(_list.deselectList())
});

export default connect(mapStateToProps, mapDispatchToProps)(MainContent);
