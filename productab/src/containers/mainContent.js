import React from "react";
import { connect } from "react-redux";

import List from "./list";
import NewList from "../components/newList";
import * as _ from "../redux/actions/baseActions";
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
    const { disableForms } = this.props;
    if (evt.target.id === "main-content")
    {
      disableForms();
    }
    evt.persist();
  }

  /* Wraps array of current board's lists into React Components to be rendered */
  showLists = () => {
    const { lists } = this.props;
    return lists.map(list => <List key={`Board. ${list.board_id} - No. ${list.id}`} list={list}/>);
  }

  render() {
    return(<div id="main-content" onClick={this.handleBlurClick}>
      {/* <List/> */}
      {this.showLists()}
      <NewList/>
    </div>);
  }
}

const mapStateToProps = (state) => ({
  lists: state.base.lists,
  cards: state.base.cards
});

const mapDispatchToProps = (dispatch) => ({
  disableForms: () => dispatch(_.disableForms()),
  getLists: (boardId) => dispatch(_.getLists(boardId)),
  getCards: () => dispatch(_.getCards())
});

export default connect(mapStateToProps, mapDispatchToProps)(MainContent);