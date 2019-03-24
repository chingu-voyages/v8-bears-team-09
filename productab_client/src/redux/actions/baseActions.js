import * as _ from "../../constants";
// import { JSON_SERVER } from "../../constants";
// import axios from "axios";

// NOTE: the userId is a placeholder, upon a working back end, there will be a change
export const getAllBoards = (user=undefined) => {
  // TODO: gets all the workspace
}

export const disableForms = () => {
  return (dispatch) => dispatch({ type: _.DISABLE_FORMS, payload: true})
}

export const enableForms = () => {
  return (dispatch) => dispatch({ type: _.ENABLE_FORMS, payload: false})
}
