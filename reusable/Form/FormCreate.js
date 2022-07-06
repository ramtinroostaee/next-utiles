import { Formik, Form } from "formik";
import React, { forwardRef, useEffect, useMemo, useState } from "react";
import MyTextField from "./MyTextField";
import MyDatePicker from "./MyDatePicker";
import MyAutocomplete from "./MyAutocomplete";
import MySelect from "./MySelect";
import MyUpload from "./MyUpload";
import MuiDatePicker from "./MuiDatePicker";
import * as yup from "yup";

export const Components = {
  DatePicker: MyDatePicker,
  TextField: MyTextField,
  AutoComplete: MyAutocomplete,
  Select: MySelect,
  Upload: MyUpload,
  MuiDatePicker,
};

export const mapCreateElement = ({ type, ...element }) => {
  const TheComponent = Components[type];
  return <TheComponent key={element.name} className="m-10" {...element} />;
};

const FormCreate = forwardRef(({ inputData, onSubmit, className }, ref) => {
  const [oonSubmit, setOonSubmit] = useState();
  const [initialValues, setInitialValues] = useState();
  const [validationSchema, setValidationSchema] = useState();
  const [data, setData] = useState(inputData);

  useEffect(() => {
    if (inputData) {
      const initialValuess = {};
      const validationSchemas = {};

      inputData.map((e) => {
        initialValuess[e.name] = e.init;
        validationSchemas[e.name] = e.validation;
      });

      setInitialValues(initialValuess);
      setValidationSchema(yup.object(validationSchemas));
      setData(
        inputData.map((e) => ({ ...e, validation: undefined, init: undefined }))
      );
    } else {
      setInitialValues();
    }
  }, [inputData]);

  useEffect(() => setOonSubmit(() => onSubmit), [onSubmit]);

  const form = useMemo(() => {
    return (
      initialValues && (
        <Formik
          innerRef={ref}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, the) => {
            console.log(values);
            console.log(the);
            oonSubmit(values);
          }}
        >
          <Form className={"flex justify-center " + className}>
            {data.map(mapCreateElement)}
          </Form>
        </Formik>
      )
    );
  }, [validationSchema, initialValues, data, oonSubmit]);

  return <>{form}</>;
});

export default FormCreate;
