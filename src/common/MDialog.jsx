import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

const MDialog = (props) => {
  const {
    handleOk,
    openDialog,
    handleClose,
    dialogText = { title: "", subTitle: "" },
  } = props;

  if (!dialogText.title.trim())
    dialogText.title = "Are you sure you want to proceed?";

  if (!dialogText.subTitle.trim())
    dialogText.subTitle =
      "The data indicated in the form will be saved in the database. Are you sure you want to proceed?";

  return (
    <>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{dialogText.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogText.subTitle}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleOk} color="primary" autoFocus>
            Proceed
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default MDialog;
