import React, { useState } from "react";
import { Field } from "formik";
import { mapCreateElement } from "./FormCreate";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

const MySelect = (props) => {
  const [selectedId, setSelectedId] = useState();

  const { label, name, options, afterinput, className, ...rest } = props;
  return (
    <>
      <Field name={name}>
        {({ field, form }) => (
          <>
            <FormControl className={className} fullWidth variant="outlined">
              <InputLabel>{label}</InputLabel>
              <Select
                name={name}
                id={name}
                label={label}
                error={form.touched[name] && Boolean(form.errors[name])}
                {...rest}
                {...field}
                onChange={(event) => {
                  const the = event.target.value;
                  setSelectedId((pre) => {
                    afterinput &&
                      afterinput[pre]?.forEach((e) => {
                        form.setFieldValue(e.name, undefined);
                      });

                    return the;
                  });
                  form.setFieldValue(name, the);
                }}
              >
                {options?.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.value}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText style={{ color: "#F44336" }}>
                {form.touched[name] && form.errors[name]}
              </FormHelperText>
            </FormControl>
          </>
        )}
      </Field>
      {afterinput && afterinput[selectedId]?.map(mapCreateElement)}
    </>
  );
};

export default MySelect;
