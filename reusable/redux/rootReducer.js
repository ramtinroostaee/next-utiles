import { combineReducers } from "@reduxjs/toolkit";
import authReducers from "reusable/auth/store";
import LoaderReducer from "reusable/Loader/LoaderSlice";

const createReducer = (asyncReducers) => (state, action) => {
  const combinedReducer = combineReducers({
    authReducers,
    LoaderReducer,
    ...asyncReducers,
  });

  /*
	Reset the redux store when user logged out
	 */
  if (action.type === "auth/user/userLoggedOut") {
    state = undefined;
  }

  return combinedReducer(state, action);
};

export default createReducer;
