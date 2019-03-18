import React from "react";

import SidePanel from './sidePanel';
import TopPanel from './topPanel';
import MainContent from './mainContent';

const Container = (props) => {
  return (<div id="container">
    {props.children}
  </div>);
}

const _Container = (props) => {
  return (<Container>
    <TopPanel/>
    <SidePanel/>
    <MainContent/>
  </Container>);
}

export default _Container;