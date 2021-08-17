import "./css/Employee.css";
import "./css/EmployeeForm.css";
import { useSnackbar } from "notistack";
import { HiUsers } from "react-icons/hi";
import { Grid } from "@material-ui/core";
import MDialog from "../../common/MDialog";
import MSwitch from "./../../common/form/MSwitch";
import React, { useState, useEffect } from "react";
import FormHeader from "../../common/form/FormHeader";
import { makeStyles } from "@material-ui/core/styles";
import FormFooter from "./../../common/form/FormFooter";
import MaterialButton from "../../common/MaterialButton";
import { store } from "../../utils/store/configureStore";
import UseEmployeeForm from "./validation/UseEmployeeForm";
import { writeToken } from "../../utils/store/pages/users";
import MaterialSelect from "../../common/form/MaterialSelect";
import { Link, useHistory, useParams } from "react-router-dom";
import MaterialTextField from "./../../common/MaterialTextField";
import { getRoles } from "../../utils/services/pages/RoleService";
import employeeFormValidate from "./validation/EmployeeFormValidate";
import { getEmployeeById } from "../../utils/services/pages/EmployeeService";

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

const EmployeeForm = () => {
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
  } = UseEmployeeForm(employeeFormValidate);

  let passwordField;
  const hist = useHistory();
  const classes = useStyles();
  const [roles, setRoles] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const { id: employeeIdFromUrl } = useParams();

  const dialog = {
    title: "Confirmation",
    subTitle: "Are you sure you want to save this record?",
  };

  useEffect(() => {
    async function populateRoles() {
      try {
        const { data } = await getRoles();
        setRoles(data);
      } catch (error) {
        enqueueSnackbar(
          "An error occured while fetching the roles in the server.",
          {
            variant: "error",
          }
        );
      }
    }

    async function populateUser() {
      try {
        if (employeeIdFromUrl === "new") return;

        const { data } = await getEmployeeById(employeeIdFromUrl);
        const { token, singleRecord } = data;

        store.dispatch(writeToken({ token }));

        handleValueOnLoad(singleRecord);
      } catch (ex) {
        if (ex && ex.status === 400) hist.replace("/not-found");
      }
    }
    populateRoles();
    populateUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (employeeIdFromUrl === "new")
    passwordField = (
      <>
        <Grid item xs={12} md={6}>
          <MaterialTextField
            id="password"
            label="Password"
            type="password"
            handleChange={handleChange}
            errors={errors.password}
            values={values.password}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <MaterialTextField
            id="password2"
            label="Re-enter password"
            type="password"
            handleChange={handleChange}
            errors={errors.password2}
            values={values.password2}
          />
        </Grid>
      </>
    );

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
      <FormHeader
        header="New Employee"
        second="Management"
        third="Employee"
        SecondIcon={HiUsers}
        isVisibleBtn={false}
      />

      <div className="employeeForm-container">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <MaterialTextField
                id="username"
                label="Username"
                handleChange={handleChange}
                errors={errors.username}
                values={values.username}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <MaterialTextField
                id="emailAddress"
                label="Email"
                type="email"
                handleChange={handleChange}
                errors={errors.emailAddress}
                values={values.emailAddress}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <MaterialTextField
                id="firstname"
                label="First name"
                handleChange={handleChange}
                errors={errors.firstname}
                values={values.firstname}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <MaterialTextField
                id="lastname"
                label="Last name"
                handleChange={handleChange}
                errors={errors.lastname}
                values={values.lastname}
              />
            </Grid>

            {passwordField}

            <Grid item xs={12} md={6}>
              <MaterialSelect
                name="roleId"
                label="Role"
                value={values.roleId}
                handleChangeInput={handleChange}
                errors={errors.roleId}
                datas={roles}
                displayText="rolename"
                menuItemValue="id"
              />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={1}
            style={{ marginTop: "10px", marginBottom: "-15px" }}
          >
            <Grid item xs={12} md={6}>
              <MSwitch
                values={values.isActive}
                handleChange={handleChange}
                name="Account active"
                subName="Disabling this will prevent the user from using the system"
              />
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>
          <div className={classes.loginDiv__margin}>
            <Link
              to="/a/user-management/employees"
              className="link"
              style={isLoading ? { pointerEvents: "none" } : null}
            >
              <MaterialButton
                disabled={isLoading ? true : false}
                color="primary"
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
          <FormFooter text="Employee are the staff working in Awari Anilao Bay Resort." />
        </form>
      </div>
    </>
  );
};

export default EmployeeForm;
