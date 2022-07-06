/* eslint import/no-extraneous-dependencies: off */
import { createSlice } from "@reduxjs/toolkit";
// import history from "@history";
import _ from "lodash";
// import {
//   setInitialSettings,
//   setDefaultSettings,
// } from "app/store/fuse/settingsSlice";
import jwtService from "../jwtService";

export const setUserData = (user) => async (dispatch) => {
  /*
    You can redirect the logged-in user to a specific route depending on his role
    */
  // history.location.state = {
  //   redirectUrl: user.redirectUrl, // for example 'apps/academy'
  // };

  /*
    Set User Settings
    */
  // console.log(user.data);
  // user.data?.settings && dispatch(setDefaultSettings(user.data?.settings));
  jwtService.setUserInfo(user);

  dispatch(setUser(user));
};

export const updateUserSettings = (settings) => async (dispatch, getState) => {
  const oldUser = getState().auth.user;
  const user = _.merge({}, oldUser, { data: { settings } });

  return dispatch(setUserData(user));
};

export const updateUserShortcuts =
  (shortcuts) => async (dispatch, getState) => {
    const { user } = getState().auth;
    const newUser = {
      ...user,
      data: {
        ...user.data,
        shortcuts,
      },
    };

    return dispatch(setUserData(newUser));
  };

export const logoutUser = () => async (dispatch, getState) => {
  const { user } = getState().auth;

  if (!user.role || user.role.length === 0) {
    // is guest
    return null;
  }

  // history.push({
  //   pathname: "/login",
  // });

  switch (user.from) {
    // case "firebase": {
    //   firebaseService.signOut();
    //   break;
    // }
    // case "auth0": {
    //   auth0Service.logout();
    //   break;
    // }
    default: {
      jwtService.logout();
    }
  }

  // dispatch(setInitialSettings());

  return dispatch(userLoggedOut());
};

const getInitialUser = () =>
  JSON.parse(window.localStorage.getItem("user_info"));

const initialState = {
  role: [], // guest
  data: {
    // displayName: "John Doe",
    // photoURL: "assets/images/avatars/Velazquez.jpg",
    // email: "johndoe@withinpixels.com",
    // shortcuts: ["calendar", "mail", "contacts", "todo"],
  },
};

const userSlice = createSlice({
  name: "auth/user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      // console.log(state, action);
      return _.merge({}, state, action.payload);
    },
    userLoggedOut: () => initialState,
  },
  extraReducers: {},
});

export const { setUser, userLoggedOut } = userSlice.actions;

export default userSlice.reducer;
