import { combineReducers } from "redux";
import { enterTheFolder, currentFolder, currentDepth } from "./reducers";

export default combineReducers({
  enterTheFolder,
  currentFolder,
  currentDepth
});
