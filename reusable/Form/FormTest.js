import { Button, Paper } from "@mui/material";
import React, { useCallback, useMemo, useRef, useState } from "react";
import FormCreate from "./FormCreate";

const FormTest = () => {
  const [value, setValue] = useState();
  const FormikRef = useRef();

  const onRefChange = useCallback(
    (node) => {
      if (node === null) {
        // console.log("node unmounted");
        // DOM node referenced by ref has been unmounted
      } else {
        FormikRef.current = node;
        if (value?.mobile !== node.values?.mobile) {
          // console.log("in");
          setValue(node.values.mobile);
        }
        // DOM node referenced by ref has changed and exists
      }
    },
    [value]
  ); // adjust deps

  const formData = useMemo(
    () => [
      {
        name: "title",
        label: "عنوان",
        init: "red",
        type: "Select",
        className: "m-2 w-128",
        options: [
          { id: "", value: <em>None</em> },
          { id: "blue", value: "Blue" },
          { id: "red", value: "Red" },
          { id: "green", value: "Green" },
        ],
        afterinput: {
          blue: [
            {
              name: "mobile",
              label: "شماره تلفن",
              init: "",
              type: "TextField",
              className: "m-2 max-w-256",
            },
          ],
        },
      },
      {
        name: "loadedAtTo",
        label: "تاریخ ثبت قرارداد تا:",
        // init: "2022-06-22",
        init: "",
        type: "MuiDatePicker",
        datePicker: {
          containerClassName: "m-2 max-w-256",
        },
      },
    ],
    []
  );

  return (
    <Paper elevation={0} className="p-12 my-8">
      <div className="flex items-center justify-center flex-wrap w-full">
        <FormCreate
          className="flex-wrap w-full"
          onSubmit={() => {}}
          inputData={formData}
          ref={onRefChange}
        />
        <Button
          variant="contained"
          className="rounded-6 min-w-96 mt-6"
          onClick={() => FormikRef?.current?.handleSubmit()}
        >
          ثبت
        </Button>
      </div>
    </Paper>
  );
};

export default FormTest;
