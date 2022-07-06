import { createSlice } from "@reduxjs/toolkit";
import JwtService from "../jwtService";
import axios from "axios";
import { setUserData } from "./userSlice";

const csrf = () => axios.get("/sanctum/csrf-cookie");

const CSRFLogin = ({ formData }) => {
  return new Promise(async (resolve, reject) => {
    await csrf();
    axios
      .post("api/login", {
        ...formData,
        email: "h.nemati70@gmail.com",
        deviceName: "windows_desktop",
        remember: "1",
      })
      .then((response) => {
        if (response.data.name) {
          const theUser = {
            role: response.data.data?.role.name ?? "admin", // remember to fix this admin condition
            ...response.data,
          };
          resolve(theUser);
        } else {
          reject(response.data?.error);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
};

export const submitLogin = (formData) => async (dispatch) => {
  // return CSRFLogin({ formData })
  return JwtService.signInWithUsernameAndPassword(formData)
    .then((user) => {
      dispatch(setUserData(user));

      return dispatch(loginSuccess());
    })
    .catch((errors) => {
      return dispatch(loginError(errors));
    });
};

const initialState = {
  success: false,
  errors: [],
};

const loginSlice = createSlice({
  name: "auth/login",
  initialState,
  reducers: {
    loginSuccess: (state) => {
      state.success = true;
      state.errors = [];
    },
    loginError: (state, action) => {
      state.success = false;
      state.errors = action.payload;
    },
  },
  extraReducers: {},
});

export const { loginSuccess, loginError } = loginSlice.actions;

export default loginSlice.reducer;
