import * as _ from "../../constants";
import { JSON_SERVER } from "../../constants";
import axios from "axios";

// NOTE: the userId is a placeholder, upon a working back end, there will be a change
export const getAllBoards = (user=undefined) => {
  // TODO: gets all the workspaces
}

export const disableForms = () => {
  return (dispatch) => dispatch({ type: _.DISABLE_FORMS, payload: true})
}

export const enableForms = () => {
  return (dispatch) => dispatch({ type: _.ENABLE_FORMS, payload: false})
}

export const getCardMembers = (cardId) => {
  return async (dispatch) => {
    const cardMemberPromise = await axios.get(JSON_SERVER + "card_members");
    const cardMembers = await cardMemberPromise.data;
    const payload = await cardMembers.filter(member => member.card_Id === cardId);
    dispatch({ type: _.GET_CARD_MEMBERS, payload })
  }
}

export const addCardMember = (cardMember) => {
  return async (dispatch) => {
    const newMemberPromise = await axios.post(JSON_SERVER + "card_members", {...cardMember});
    const newMember = newMemberPromise.data;
    const payload = newMember;
    dispatch({ type: _.ADD_CARD_MEMBER, payload })
  }
}

export const removeCardMember = async(cardMemberId, cardMembers) => {
  return async(dispatch) => {
    const removePromise = await axios.delete(JSON_SERVER + `card_member/${cardMemberId}`);
    const removeCardMember = await removePromise.data;
    let payload = null;
    if (removeCardMember !== undefined) {
      payload = cardMembers.filter(member => member.id !== cardMemberId);
    }
    dispatch({ type: _.REMOVE_CARD_MEMBER, payload });
  }
}