import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import MDialog from "../../../common/MDialog";
import { useHistory } from "react-router-dom";
import SaveIcon from "@material-ui/icons/Save";
import React, { useEffect, useState } from "react";
import MSwitch from "../../../common/form/MSwitch";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import UseProductForm from "./validation/UseProductForm";
import MaterialButton from "../../../common/MaterialButton";
import { Grid, Paper, ButtonGroup } from "@material-ui/core";
import MaterialSelect from "../../../common/form/MaterialSelect";
import ProductFormValidate from "./validation/ProductFormValidate";
import MaterialTextField from "./../../../common/MaterialTextField";
import { getProdCategory } from "./../../../utils/services/pages/products/ProductCategoryService";

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

const ProductForm = ({ data, onCancel, onSuccessEdit, onSuccessAdd }) => {
  const hist = useHistory();
  const [category, setCategory] = useState([]);
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
  } = UseProductForm(ProductFormValidate, onSuccessEdit, onSuccessAdd);

  useEffect(() => {
    async function populateCategories() {
      try {
        const { data } = await getProdCategory();

        setCategory(data.listRecords);
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
    populateCategories();
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
                id="longName"
                label="Long Name"
                handleChange={handleChange}
                errors={errors.longName}
                values={values.longName}
              />
            </Grid>
            <Grid item xs={12}>
              <MaterialTextField
                id="shortName"
                label="Short Name"
                handleChange={handleChange}
                errors={errors.shortName}
                values={values.shortName}
              />
            </Grid>

            <Grid item xs={12}>
              <MaterialTextField
                id="numberOfServing"
                label="Number of Serving"
                type="number"
                handleChange={handleChange}
                errors={errors.numberOfServing}
                values={values.numberOfServing}
              />
            </Grid>
            <Grid item xs={12}>
              <MaterialTextField
                id="sellingPrice"
                label="Selling Price"
                type="number"
                handleChange={handleChange}
                errors={errors.sellingPrice}
                values={values.sellingPrice}
              />
            </Grid>

            <Grid item xs={12}>
              <MaterialSelect
                name="productCategoryId"
                label="Category"
                value={values.productCategoryId}
                handleChangeInput={handleChange}
                errors={errors.productCategoryId}
                datas={category}
                displayText="name"
                menuItemValue="_id"
                maxWidth="100%"
              />
            </Grid>
            <Grid item xs={12} md={10}>
              <MSwitch
                values={values.isActivityType}
                handleChange={handleChange}
                name="Activity Type"
                switchName="isActivityType"
                subName="These are product that requires appointments"
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
export default ProductForm;
