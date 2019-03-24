import { combineReducers } from "redux";
import { base } from "./baseReducer";
import { list} from "./listReducer";
import { card } from "./cardReducer";

const rootReducer = combineReducers({
  base,
  list,
  card
});

export default rootReducer;