import React from "react";
import { connect } from "react-redux";

import * as _ from "../redux/actions/baseActions";

class NewList extends React.Component {
  state ={
    newFormOn: false
  }

  componentDidUpdate() {
    const newList = document.getElementById("new-list");
    if (this.props.formsDisabled) {
      newList.classList.replace("list-style", "new-list");
    }
  }

  handleAddListForm = (evt) => {
    //WARNING: disable other open forms first!!
    this.props.disableForms();
    this.props.enableForms();
    const newListForm = document.getElementById("new-list");
    newListForm.classList.replace("new-list", "list-style");
    // replace the class new-list with list for the grand-parent div
    this.setState({newFormOn: true }, () => {
      const textArea = document.getElementById("new-list-text");
      textArea.focus();
    });
    evt.persist();
  }

  handleAddList = (evt) => {
    alert('it worked');
    evt.persist();
  }

  handleCancelList = (evt) => {
    const newListForm = document.getElementById("new-list");
    newListForm.classList.replace("list-style", "new-list");
    this.setState({newFormOn: false });
    evt.persist();
  }

  render() {
    const { newFormOn } = this.state;
    const { formsDisabled } = this.props;

    return (<div id="new-list" className="new-list list-sizing shrink-container transparent-black" /* onBlur={this.handleCancelList} */>
      <span id="new-list-span">
          { newFormOn && !!!formsDisabled
            ?  <form id="new-list-form">
                <textarea name="new-list-name" id="new-list-text" cols="20" rows="1" placeholder="A New List"/>
                <div className="new-list-buttons">
                  <button className="add-list-button" onClick={this.handleAddList}>Add List</button>
                  <i className="fas fa-times" onClick={this.handleCancelList}/>
                </div>
            </form>
            
            :<div id="add-list"><i className="fas fa-plus" onClick={this.handleAddListForm}/><p>Add another List</p></div>
          }
      </span>
    </div>);
  }
}

const mapStateToProps = (state) => ({
  formsDisabled: state.base.formsDisabled,
});

const mapDispatchToProps = (dispatch) => ({
  enableForms: () => dispatch(_.enableForms()),
  disableForms: () => dispatch(_.disableForms())
});

export default connect(mapStateToProps, mapDispatchToProps)(NewList);