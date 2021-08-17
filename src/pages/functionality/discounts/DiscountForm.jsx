import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import MDialog from "../../../common/MDialog";
import { useHistory } from "react-router-dom";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import MSwitch from "../../../common/form/MSwitch";
import { makeStyles } from "@material-ui/core/styles";
import MaterialButton from "../../../common/MaterialButton";
import { Grid, Paper, ButtonGroup } from "@material-ui/core";
import MaterialTextField from "../../../common/MaterialTextField";
import UseDiscountForm from "./validation/UseDiscountForm";
import DiscountFormValidate from "./validation/DiscountFormValidate";

const useStyles = makeStyles((theme) => ({
  root: { padding: "15px", paddingTop: "30px" },
  textField: {
    [`& fieldset`]: {
      borderRadius: 16,
    },
  },
  loginDiv__margin: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "flex-end",
  },
}));

const DiscountForm = ({ data, onCancel, onSuccessEdit, onSuccessAdd }) => {
  const hist = useHistory();
  const classes = useStyles();
  const {
    askConfirmation,
    handleChange,
    values,
    handleSubmit,
    errors,
    handleValueOnLoad,
    handleDialogProceed,
    handleDialogCancel,
  } = UseDiscountForm(DiscountFormValidate, onSuccessEdit, onSuccessAdd);

  useEffect(() => {
    async function populateCustomer() {
      try {
        if (!data.hasOwnProperty("_id")) return;

        handleValueOnLoad(data);
      } catch (ex) {
        if (ex && ex.status === 400) hist.replace("/not-found");
      }
    }

    populateCustomer();
  }, []); // eslint-disable-line

  const isLoading = useSelector(
    (state) => state.entities.roomVariant.isLoading
  );

  return (
    <>
      {askConfirmation && (
        <MDialog
          openDialog={askConfirmation}
          handleClose={handleDialogCancel}
          handleOk={handleDialogProceed}
        />
      )}

      <Paper
        elevation={3}
        square
        className={`formList-container ${classes.root}`}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <MaterialTextField
                id="name"
                label="Discount name"
                handleChange={handleChange}
                errors={errors.name}
                values={values.name}
              />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={1}
            style={{ marginTop: "10px", marginBottom: "-15px" }}
          >
            <Grid item xs={12}>
              <MSwitch
                values={values.isByPercentage}
                handleChange={handleChange}
                switchName="isByPercentage"
                name="By percentage Discount"
                subName="The discount will be by percentage"
              />
            </Grid>
            <Grid item xs={12}>
              <MaterialTextField
                id="value"
                type="number"
                label="Value"
                handleChange={handleChange}
                errors={errors.value}
                values={values.value}
              />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={1}
            style={{ marginTop: "10px", marginBottom: "-15px" }}
          >
            <Grid item xs={12}>
              <MSwitch
                values={values.isRequiredCustomer}
                handleChange={handleChange}
                switchName="isRequiredCustomer"
                name="Require Customer"
                subName="Discount that requires active customer"
              />
            </Grid>
            <Grid item xs={12}>
              <MSwitch
                values={values.isRequiredId}
                handleChange={handleChange}
                switchName="isRequiredId"
                name="Require Customer Id"
                subName="Discount that requires guest Id"
              />
            </Grid>
            <Grid item xs={12}>
              <MSwitch
                values={values.isRequiredApproval}
                handleChange={handleChange}
                switchName="isRequiredApproval"
                name="Require approval"
                subName="Discount that requires approval"
              />
            </Grid>
            <Grid item xs={12}>
              <MSwitch
                values={values.isActive}
                handleChange={handleChange}
                name="Active Status"
                subName="Allows discount to be used on transactions"
              />
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>
          <div className={classes.loginDiv__margin}>
            <ButtonGroup
              variant="contained"
              color="primary"
              aria-label="text primary button group"
            >
              <MaterialButton
                disabled={isLoading}
                text="Cancel"
                color="secondary"
                startIcon={<DeleteIcon />}
                onClick={onCancel}
              />
              <MaterialButton
                disabled={isLoading}
                text="Submit"
                color="primary"
                endIcon={<SaveIcon />}
                onClick={handleSubmit}
              />
            </ButtonGroup>
          </div>
        </form>
      </Paper>
    </>
  );
};

export default DiscountForm;
