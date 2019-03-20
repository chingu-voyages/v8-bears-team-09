import React from "react";
import { connect } from "react-redux";

import List from "./list";
import NewList from "../components/newList";
import * as _ from "../redux/actions/baseActions";
import "../_stylesheet/components.scss";

class MainContent extends React.Component {
  state = {

  }

  handleBlurClick = (evt) => {
    const { disableForms } = this.props;
    if (evt.target.id === "main-content")
    {
      disableForms();
    }
    evt.persist();
  }

  render() {
    return(<div id="main-content" onClick={this.handleBlurClick}>
      <List/>
      <NewList/>
    </div>);
  }
}

const mapDispatchToProps = (dispatch) => ({
  disableForms: () => dispatch(_.disableForms())
});

export default connect(null, mapDispatchToProps)(MainContent);