import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { useMountedState } from "react-use";
import Loader from "./../../../common/Loader";
import MDialog from "../../../common/MDialog";
import { useHistory } from "react-router-dom";
import SaveIcon from "@material-ui/icons/Save";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import MSwitch from "./../../../common/form/MSwitch";
import { makeStyles } from "@material-ui/core/styles";
import { store } from "../../../utils/store/configureStore";
import MaterialButton from "../../../common/MaterialButton";
import { Grid, Paper, ButtonGroup } from "@material-ui/core";
import { writeToken } from "../../../utils/store/pages/users";
import MaterialSelect from "../../../common/form/MaterialSelect";
import UseRoomPricingForm from "./validation/UseRoomPricingForm";
import MaterialTextField from "./../../../common/MaterialTextField";
import RoomPricingFormValidate from "./validation/RoomPricingFormValidate";
import { getRooms } from "./../../../utils/services/pages/rooms/RoomService";

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

const RoomPricingForm = ({ data, onCancel, onSuccessEdit, onSuccessAdd }) => {
  const hist = useHistory();
  const classes = useStyles();
  const isMounted = useMountedState();
  const [rooms, setRooms] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [initialLoadForm, setInitialLoadForm] = useState(false);
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
  } = UseRoomPricingForm(RoomPricingFormValidate, onSuccessEdit, onSuccessAdd);

  useEffect(() => {
    function populatePricingDetails() {
      try {
        if (!data.hasOwnProperty("_id")) return;

        handleValueOnLoad(data);
      } catch (ex) {
        if (ex && ex.status === 400) hist.replace("/not-found");
      }
    }

    async function populateRooms() {
      try {
        const { data } = await getRooms();
        const { token, listRecords } = data;

        const sortedRoom = listRecords.sort((a, b) =>
          a.roomLongName.localeCompare(b.roomLongName)
        );

        store.dispatch(writeToken({ token }));

        setTimeout(() => {
          if (!isMounted()) return;

          setRooms(sortedRoom);
          setInitialLoadForm(true);
        }, 500);
        //
      } catch (error) {
        enqueueSnackbar("An error occured while calling the server.", {
          variant: "error",
        });
        return () => {
          setRooms([]);
        };
      }
    }

    populateRooms();
    populatePricingDetails();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!initialLoadForm) return <Loader />;

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
              <MaterialSelect
                name="roomId"
                label="Room"
                value={values.roomId}
                handleChangeInput={handleChange}
                errors={errors.roomId}
                datas={rooms}
                displayText="searchName"
                menuItemValue="_id"
                maxWidth="100%"
              />
            </Grid>
            <Grid item xs={12}>
              <MaterialTextField
                id="capacity"
                type="number"
                label="Capacity"
                handleChange={handleChange}
                errors={errors.capacity}
                values={values.capacity}
              />
            </Grid>
            <Grid item xs={12}>
              <MaterialTextField
                id="sellingPrice"
                type="number"
                label="Selling Price"
                handleChange={handleChange}
                errors={errors.sellingPrice}
                values={values.sellingPrice}
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

export default RoomPricingForm;
