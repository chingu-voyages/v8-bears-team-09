import React from "react";

const Board = (props) => {
  return(<div className="board">
    {props.children}
  </div>);
}

const _Board = (props) => {
  return(<Board>
    Board
  </Board>);
}

export default _Board;
