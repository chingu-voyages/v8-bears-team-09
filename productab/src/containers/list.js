import React from "react";

const List = (props) => {
  return(<div className="list">
    {props.children}
  </div>);
}
const _List = (props) => {
  return(<List>
    List
  </List>);
}

export default _List;

