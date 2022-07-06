import { Button, Icon, Input } from "@mui/material";
import { Field } from "formik";
import React from "react";

const MyUpload = ({ label, name, accept, className, ...rest }) => {
  return (
    <Field name={name}>
      {({ field, form }) => {
        const { value, ...restField } = field;

        return (
          <div className="flex flex-col justify-center items-center">
            <label className={className} htmlFor={name}>
              <Input
                accept={accept ?? "image/*"}
                className="hidden"
                id={name}
                type="file"
                {...restField}
                onChange={(event) =>
                  form.setFieldValue(name, event.target.files[0])
                }
                {...rest}
              />
              <Button
                className="rounded-8 py-10 px-24 "
                variant="outlined"
                component="span"
              >
                <Icon color="action">cloud_upload</Icon>
                {label ?? ""}
              </Button>
            </label>
            <span>{value?.name}</span>
          </div>
        );
      }}
    </Field>
  );
};

export default MyUpload;
