import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setUserData } from "./userSlice";

const csrf = () => axios.get("/sanctum/csrf-cookie");
const CSRFRegister = (values) => {
  return new Promise(async (resolve, reject) => {
    await csrf();
    axios
      .post("api/register", {
        ...values,
        name: "hadi",
        email: "ramtin@gmail.com",
        deviceName: "windows_desktop",
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

export const submitRegister = (values) => async (dispatch) => {
  // return jwtService
  //   .createUser({
  //     displayName,
  //     password,
  //     email,
  //   })
  return CSRFRegister(values)
    .then((user) => {
      dispatch(setUserData(user));
      return dispatch(registerSuccess());
    })
    .catch((errors) => {
      return dispatch(registerError(errors));
    });
};

const initialState = {
  success: false,
  errors: [],
};

const registerSlice = createSlice({
  name: "auth/register",
  initialState,
  reducers: {
    registerSuccess: (state) => {
      state.success = true;
      state.errors = [];
    },
    registerError: (state, action) => {
      state.success = false;
      state.errors = action.payload;
    },
  },
  extraReducers: {},
});

export const { registerSuccess, registerError } = registerSlice.actions;

export default registerSlice.reducer;
