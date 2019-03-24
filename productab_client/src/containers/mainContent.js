import React from "react";
import { connect } from "react-redux";

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
    getLists(1);
    getCards();
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
    return lists.map(list => <List key={`Board. ${list.board_id} - No. ${list.id}`} list={list}/>);
  }

  render() {
    return(<div id="main-content" onClick={this.handleBlurClick}>
      <div id="inner-content">
        {this.showLists()}
        <NewList/>
      </div>
    </div>);
  }
}

const mapStateToProps = (state) => ({
  lists: state.list.lists,
  cards: state.card.cards
});

const mapDispatchToProps = (dispatch) => ({
  disableForms: () => dispatch(_base.disableForms()),
  getLists: (boardId) => dispatch(_list.getLists(boardId)),
  getCards: () => dispatch(_card.getCards()),
  deselectList: () => dispatch(_list.deselectList())
});

export default connect(mapStateToProps, mapDispatchToProps)(MainContent);