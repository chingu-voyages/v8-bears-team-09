import React from "react";
import { connect } from "react-redux";

import SidePanel from './sidePanel';
import TopPanel from './topPanel';
import MainContent from './mainContent';
import Modal from "./modal";

import "../_stylesheet/App.scss";

const Container = (props) => {
  const { modalVisible } = props;
  return (<div id="container">
    {modalVisible && <Modal/>}
    <TopPanel/>
    <SidePanel/>
    <MainContent/>
  </div>);
}

const mapStateToProps = (state) => ({
  modalVisible: state.base.modalOn
});

export default connect(mapStateToProps)(Container);