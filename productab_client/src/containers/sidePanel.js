import React from "react";

const SidePanel = (props) => {
  return(<div id="side-panel">
    {props.children}
  </div>);
}

const _SidePanel = (props) => {
  return(<SidePanel>
    Side Panel
  </SidePanel>);
}


export default _SidePanel;