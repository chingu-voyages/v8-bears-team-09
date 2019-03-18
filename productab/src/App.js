import React, { Component } from "react";
import Container from './containers/container';
import "./_stylesheet/App.scss";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Container/>
      </div>
    );
  }
}

export default App;
