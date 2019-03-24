import React from "react";

import SidePanel from './sidePanel';
import TopPanel from './topPanel';
import MainContent from './mainContent';

import "../_stylesheet/App.scss";

const Container = (props) => {
  return (<div id="container">
    <TopPanel/>
    <SidePanel/>
    <MainContent/>
  </div>);
}

export default Container;