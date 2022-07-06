import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from "@material-ui/core";
import React, { useRef } from "react";
import FormCreate from "reusable/Form/FormCreate";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FormDialog = ({ open, handleClose, ...rest }) => {
  const FormikRef = useRef("");

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      fullWidth={true}
      onClose={() => {}}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle className="mx-20">ویرایش</DialogTitle>
      <DialogContent>
        <FormCreate className="flex-col" {...rest} ref={FormikRef} />
      </DialogContent>
      <DialogActions className="justify-around mb-8">
        <Button
          variant="contained"
          color="secondary"
          onClick={() => FormikRef?.current?.handleSubmit()}
        >
          ثبت
        </Button>
        <Button variant="contained" autoFocus onClick={handleClose}>
          انصراف
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormDialog;
