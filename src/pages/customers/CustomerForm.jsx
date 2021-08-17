import "./css/Employee.css";
import moment from "moment";
import "./css/EmployeeForm.css";
import { HiUsers } from "react-icons/hi";
import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import MomentUtils from "@date-io/moment";
import MDialog from "../../common/MDialog";
import MSwitch from "./../../common/form/MSwitch";
import FormHeader from "../../common/form/FormHeader";
import { makeStyles } from "@material-ui/core/styles";
import FormFooter from "./../../common/form/FormFooter";
import MaterialButton from "../../common/MaterialButton";
import { store } from "../../utils/store/configureStore";
import { KeyboardDatePicker } from "@material-ui/pickers";
import UseCustomerForm from "./validation/UseCustomerForm";
import { writeToken } from "../../utils/store/pages/users";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Link, useHistory, useParams } from "react-router-dom";
import MaterialTextField from "./../../common/MaterialTextField";
import customerFormValidate from "./validation/CustomerFormValidate";
import { getCustomerById } from "../../utils/services/pages/CustomerService";

const useStyles = makeStyles((theme) => ({
  login__button: {
    borderRadius: 16,
    textTransform: "capitalize",
    width: "100%",
    maxWidth: "200px",
    marginBottom: "5px",
    marginRight: "5px",
  },
  textField: {
    [`& fieldset`]: {
      borderRadius: 16,
    },
  },

  loginDiv__margin: {
    marginTop: "20px",
  },
  employeeFormInfo_header: {
    fontFamily: `"Poppins", sans-serif`,
    margin: "0px 0px 0.35em",
    fontWeight: 500,
    fontSize: "0.875rem",
    lineHeight: "1.57",
    color: "rgb(23, 43, 77)",
  },
  employeeFormInfo_helper: {
    fontFamily: `"Poppins", sans-serif`,
    fontWeight: "400",
    fontSize: "0.875rem",
    lineHeight: "1.43",
    color: "rgb(107, 119, 140)",
  },
  employeeFormInfo_switch: {
    marginLeft: "-8px",
  },
  employeeForm_input: {
    width: "100%",
    maxWidth: "170px",
  },
}));

const CustomerForm = () => {
  //..
  const {
    askConfirmation,
    handleChange,
    values,
    handleSubmit,
    isLoading,
    errors,
    handleValueOnLoad,
    handleDialogProceed,
    handleDialogCancel,
    handleChangeBirthday,
  } = UseCustomerForm(customerFormValidate);

  const dialog = {
    title: "Confirmation",
    subTitle: "Are you sure you want to save this record?",
  };

  const hist = useHistory();
  const classes = useStyles();
  const { id: employeeIdFromUrl } = useParams();

  useEffect(() => {
    async function populateCustomer() {
      try {
        if (employeeIdFromUrl === "new") return;

        const { data } = await getCustomerById(employeeIdFromUrl);
        const { token, singleRecord } = data;

        store.dispatch(writeToken({ token }));

        handleValueOnLoad(singleRecord);
      } catch (ex) {
        if (ex && ex.status === 400) hist.replace("/not-found");
      }
    }

    populateCustomer();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDateChange = (date) => {
    handleChangeBirthday(moment(date).format("yyyy-MM-DD"));
  };

  return (
    <>
      {askConfirmation && (
        <MDialog
          openDialog={askConfirmation}
          handleClose={handleDialogCancel}
          handleOk={handleDialogProceed}
          dialogText={dialog}
        />
      )}
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <FormHeader
          header="New Customer"
          second="Management"
          third="Customer"
          SecondIcon={HiUsers}
          isVisibleBtn={false}
        />

        <div className="employeeForm-container">
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <MaterialTextField
                  id="firstname"
                  label="First name"
                  handleChange={handleChange}
                  errors={errors.firstname}
                  values={values.firstname}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MaterialTextField
                  id="lastname"
                  label="Last name"
                  handleChange={handleChange}
                  errors={errors.lastname}
                  values={values.lastname}
                />
              </Grid>
              <Grid item xs={12}>
                <MaterialTextField
                  id="address"
                  label="Physical Address"
                  handleChange={handleChange}
                  errors={errors.address}
                  values={values.address}
                  multiline={true}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MaterialTextField
                  id="emailAddress"
                  label="Email Address"
                  type="email"
                  handleChange={handleChange}
                  errors={errors.emailAddress}
                  values={values.emailAddress}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <MaterialTextField
                  id="mobile"
                  label="Mobile number"
                  type="number"
                  handleChange={handleChange}
                  errors={errors.mobile}
                  values={values.mobile}
                />
              </Grid>
              <Grid item xs={12}>
                <MaterialTextField
                  id="customerid"
                  label="Customer ID"
                  type="number"
                  handleChange={handleChange}
                  errors={errors.customerid}
                  values={values.customerid}
                />
              </Grid>
              <Grid item xs={12}>
                <KeyboardDatePicker
                  openTo="year"
                  orientation="landscape"
                  autoOk
                  alpha=""
                  variant="inline"
                  animateYearScrolling
                  allowKeyboardControl
                  inputVariant="outlined"
                  label="Birth date"
                  format="MMMM Do YYYY"
                  value={values.birthday}
                  id="birthday"
                  onChange={(date) => handleDateChange(date)}
                  style={{ width: "100%", height: "44px" }}
                />
              </Grid>
            </Grid>
            <Grid
              container
              spacing={1}
              style={{ marginTop: "10px", marginBottom: "-15px" }}
            >
              <Grid item xs={12} sm={6}>
                <MSwitch
                  values={values.isActive}
                  handleChange={handleChange}
                  name="Customer Active"
                  subName="Disabling this will prevent this customer from making transactions."
                />
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
            <div className={classes.loginDiv__margin}>
              <Link
                to="/a/user-management/customers"
                className="link"
                style={isLoading ? { pointerEvents: "none" } : null}
              >
                <MaterialButton
                  color="primary"
                  disabled={isLoading ? true : false}
                  classes={classes.login__button}
                  text="Back"
                />
              </Link>
              <MaterialButton
                disabled={isLoading ? true : false}
                color="primary"
                onClick={handleSubmit}
                classes={classes.login__button}
                text={`${isLoading ? "Saving..." : "Save"}`}
              />
            </div>
            <div className={classes.loginDiv__margin}></div>
            <FormFooter text="Customer are the guest in Awari Anilao Bay Resort." />
          </form>
        </div>
      </MuiPickersUtilsProvider>
    </>
  );
};

export default CustomerForm;
