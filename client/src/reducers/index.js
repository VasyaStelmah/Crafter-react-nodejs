import { combineReducers } from "redux";
import { recipes } from "./recipes";
import { subjects } from "./subjects";
import { authReducer } from "./auth";
export default combineReducers({
  recipes,
  subjects,
  authReducer,
});
