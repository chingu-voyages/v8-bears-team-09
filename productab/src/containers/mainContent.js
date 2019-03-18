import React from "react";

const MainContent = (props) => {
  return(<div id="main-content">
    {props.children}
  </div>);
}
const _MainContent = (props) => {
  return(<MainContent>
    Main Content
  </MainContent>);
}

export default _MainContent;