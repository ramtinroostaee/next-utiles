import axios from "axios";
import { toast } from "react-toastify";
import { isShebaValid } from "@persian-tools/persian-tools";
import * as Yup from "yup";
import { isValid } from "date-fns-jalali";

/**
 * Axios HTTP Request defaultsss
 */

axios.defaults.baseURL = "https://dande.karbaladapp.ir";
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common["Content-Type"] =
  "application/x-www-form-urlencoded";
axios.defaults.headers.common["Accept"] = "application/json";

Yup.addMethod(Yup.string, "correctSheba", function (message) {
  return this.test("test-sheba", message, function (value) {
    const { path, createError } = this;
    // [value] - value of the property being tested
    // [path]  - property name,
    // ...
    // return someCondition || conditionTwo || createError(...);

    if (value) {
      return isShebaValid("IR" + value);
    }
    return createError(message);
  });
});

Yup.addMethod(Yup.string, "correctDate", function (message) {
  return this.test("test-date", message, function (value) {
    const { path, createError } = this;
    // [value] - value of the property being tested
    // [path]  - property name,
    // ...
    // return someCondition || conditionTwo || createError(...);

    if (value) {
      return isValid(value);
    }
    return createError(message);
  });
});

export const apiCallTry = async (fu) => {
  try {
    const response = await fu();

    return response;
  } catch (error) {
    if (error.response) {
      // console.log(error.response.data);
      // console.log(error.response.status);
      // console.log(error.response.headers);
      toast.error(error.response.data.message);
    } else {
      toast.error(error.message);
    }
  }
};

export const initInterceptors = (showLoader, hideLoader) => {
  axios.interceptors.request.use(
    (req) => {
      showLoader();
      return req;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      hideLoader();
      return response;
    },
    (err) => {
      hideLoader();
      return Promise.reject(err);
    }
  );
};
