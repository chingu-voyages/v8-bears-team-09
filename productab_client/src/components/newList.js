import React from "react";
import { connect } from "react-redux";

import * as _ from "../redux/actions/baseActions";
import * as _list from "../redux/actions/listActions";

class NewList extends React.Component {
  state = {
    newFormOn: false,
    title: ""
  };

  componentDidUpdate(prevProps) {
    const { formsDisabled, selectedList } = this.props;
    const { newFormOn } = this.state;
    const newList = document.getElementById("new-list");
    if (prevProps !== this.props) {
      if ((formsDisabled && newFormOn) || selectedList !== null) {
        this.setState({ newFormOn: false }, () => {
          this.setState({ title: "" });
        });
        newList.classList.replace("list-style", "new-list");
      }
    }
  }

  handleChangeTitle = evt => {
    this.setState({ title: evt.target.value });
    evt.persist();
  };

  handleAddListForm = evt => {
    // WARNING: disable other open forms first!!
    this.props.deselectList();
    this.props.disableForms();
    this.props.enableForms();
    const newListForm = document.getElementById("new-list");
    newListForm.classList.replace("new-list", "list-style");
    // replace the class new-list with list for the grand-parent div
    this.setState({ newFormOn: true }, () => {
      const textArea = document.getElementById("new-list-text");
      textArea.focus();
    });
    evt.persist();
  };

  handleAddList = evt => {
    const { title } = this.state;
    const { addList, disableForms } = this.props;
    // NOTE: add a length check and some regexp to stop users from making "dumb" titles
    if (title && title.length >= 3) {
      addList({
        title,
        info: "",
        board_id: 1,
        cardCount: 0
      });
    }
    disableForms();
    evt.persist();
    evt.preventDefault();
  };

  handleCancelList = evt => {
    const newListForm = document.getElementById("new-list");
    newListForm.classList.replace("list-style", "new-list");
    this.setState({ newFormOn: false });
    evt.persist();
  };

  render() {
    const { newFormOn } = this.state;

    return (
      <div
        id="new-list"
        className="new-list list-sizing shrink-container transparent-black" /* onBlur={this.handleCancelList} */
      >
        <span id="new-list-span">
          {newFormOn ? (
            <form id="new-list-form">
              <textarea
                onChange={this.handleChangeTitle}
                name="new-list-name"
                id="new-list-text"
                cols="20"
                rows="1"
                placeholder="A New List"
              />
              <div className="new-list-buttons">
                <button
                  className="add-list-button"
                  onClick={this.handleAddList}
                >
                  Add List
                </button>
                <i className="fas fa-times" onClick={this.handleCancelList} />
              </div>
            </form>
          ) : (
            <div id="add-list">
              <i className="fas fa-plus" onClick={this.handleAddListForm} />
              <p>Add another List</p>
            </div>
          )}
        </span>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  formsDisabled: state.base.formsDisabled,
  currentBoard: state.base.currentBoard,
  selectedList: state.list.selectedList
});

const mapDispatchToProps = dispatch => ({
  enableForms: () => dispatch(_.enableForms()),
  disableForms: () => dispatch(_.disableForms()),
  addList: (listObj) => dispatch(_list.addList(listObj)),
  deselectList: () => dispatch(_list.deselectList())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewList);
