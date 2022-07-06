import React from "react";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Field } from "formik";
import { format, isValid } from "date-fns";

const MuiDatePicker = ({ label, name, datePicker, textField }) => (
  <Field name={name}>
    {({ field, form }) => {
      console.log(field);

      return (
        <DatePicker
          {...field}
          label={label}
          mask="____/__/__"
          onChange={(newValue) => {
            form.setFieldValue(
              name,
              isValid(newValue) ? format(newValue, "yyyy/MM/dd") : newValue
            );
          }}
          {...datePicker}
          renderInput={(params) => <TextField {...params} {...textField} />}
        />
      );
    }}
  </Field>
);

export default MuiDatePicker;
