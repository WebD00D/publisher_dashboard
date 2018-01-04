import initialState from "./initialState";
import {
  FETCH_STUFF,
  RECEIVE_STUFF,
  CHANGE_PUBLICATION_NAME
} from "../actions/allActions";

export default function library(state = initialState.library, action) {
  let newState;

  switch (action.type) {
    case CHANGE_PUBLICATION_NAME:
      console.log("PUBLICATION NAME CHANGE ACTION", action.name);
      return {
        ...state,
        publication: action.name
      };
    case FETCH_STUFF:
      console.log("FETCH_STUFF Action");
      return action;
    case RECEIVE_STUFF:
      newState = action.stuff;
      console.log("RECEIVE_STUFF Action");
      return newState;
    default:
      return state;
  }
}
