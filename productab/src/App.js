import React, { Component } from "react";
import Container from './containers/container';
import { connect } from "react-redux";

import "./_stylesheet/App.scss";
import "./_stylesheet/components.scss";
import "./_stylesheet/forms.scss";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Container/>
      </div>
    );
  }
}

export default connect(null)(App);
