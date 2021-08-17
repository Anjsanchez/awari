import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import MDialog from "../../../common/MDialog";
import { useHistory } from "react-router-dom";
import SaveIcon from "@material-ui/icons/Save";
import React, { useEffect, useState } from "react";
import UseRoomForm from "./validation/UseRoomForm";
import MSwitch from "../../../common/form/MSwitch";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import MaterialButton from "../../../common/MaterialButton";
import RoomFormValidate from "./validation/RoomFormValidate";
import { Grid, Paper, ButtonGroup } from "@material-ui/core";
import MaterialSelect from "../../../common/form/MaterialSelect";
import MaterialTextField from "../../../common/MaterialTextField";
import { getRoomVariants } from "./../../../utils/services/pages/rooms/RoomVariantService";

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

const RoomForm = ({ data, onCancel, onSuccessEdit, onSuccessAdd }) => {
  const hist = useHistory();
  const [variants, setVariants] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const isLoading = useSelector(
    (state) => state.entities.roomVariant.isLoading
  );
  const {
    askConfirmation,
    handleChange,
    values,
    handleSubmit,
    errors,
    handleValueOnLoad,
    handleDialogProceed,
    handleDialogCancel,
  } = UseRoomForm(RoomFormValidate, onSuccessEdit, onSuccessAdd);

  useEffect(() => {
    async function populateVariants() {
      try {
        const { data } = await getRoomVariants();

        setVariants(data.listRecords);
      } catch (error) {
        enqueueSnackbar(
          "An error occured while fetching the roles in the server.",
          {
            variant: "error",
          }
        );
      }
    }

    async function populateRoom() {
      try {
        if (!data.hasOwnProperty("_id")) return;

        handleValueOnLoad(data);
      } catch (ex) {
        if (ex && ex.status === 400) hist.replace("/not-found");
      }
    }
    populateVariants();
    populateRoom();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
                id="roomLongName"
                label="Room name"
                handleChange={handleChange}
                errors={errors.roomLongName}
                values={values.roomLongName}
              />
            </Grid>
            <Grid item xs={12}>
              <MaterialTextField
                id="searchName"
                label="Search name"
                handleChange={handleChange}
                errors={errors.searchName}
                values={values.searchName}
              />
            </Grid>

            <Grid item xs={12}>
              <MaterialSelect
                name="roomVariantId"
                label="Room Variant"
                value={values.roomVariantId}
                handleChangeInput={handleChange}
                errors={errors.roomVariantId}
                datas={variants}
                displayText="name"
                menuItemValue="_id"
                maxWidth="100%"
              />
            </Grid>
            <Grid item xs={12}>
              <MaterialTextField
                id="numberOfRooms"
                label="Number of Rooms"
                type="number"
                handleChange={handleChange}
                errors={errors.numberOfRooms}
                values={values.numberOfRooms}
              />
            </Grid>
            <Grid item xs={6}>
              <MaterialTextField
                id="minimumCapacity"
                label="Minimum Capacity"
                type="number"
                handleChange={handleChange}
                errors={errors.minimumCapacity}
                values={values.minimumCapacity}
              />
            </Grid>
            <Grid item xs={6}>
              <MaterialTextField
                id="maximumCapacity"
                label="Maximum Capacity"
                type="number"
                handleChange={handleChange}
                errors={errors.maximumCapacity}
                values={values.maximumCapacity}
              />
            </Grid>
            <Grid item xs={12}>
              <MSwitch
                values={values.isActive}
                handleChange={handleChange}
                name="Active Status"
                subName="This will prevent from making transactions"
              />
            </Grid>
            <Grid item xs={12} md={10}>
              <MSwitch
                values={values.isAllowExtraPax}
                handleChange={handleChange}
                name="Allow Extra Pax"
                switchName="isAllowExtraPax"
                subName="This will allow adding pax on transactions"
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <MSwitch
                values={values.isPerPaxRoomType}
                handleChange={handleChange}
                switchName="isPerPaxRoomType"
                name="Per Pax Pricing Type"
                subName="Room price will be multiplied by pax * price"
              />
            </Grid>
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

export default RoomForm;
