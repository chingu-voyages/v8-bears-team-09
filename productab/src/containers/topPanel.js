import React from "react";

const TopPanel = (props) => {
  return (<div id="top-panel">
    {props.children}
  </div>);
}

const _TopPanel = (props) => {
  return (<TopPanel>
    Top Panel
  </TopPanel>);
}

export default _TopPanel;
