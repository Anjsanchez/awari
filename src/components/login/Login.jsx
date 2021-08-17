import "./Login.css";
import React from "react";
import { Redirect } from "react-router-dom";
import * as logo from "../../common/ApSoftwareLogo";
import auth from "../../utils/services/authServices";
import useLoginForm from "./validation/useLoginForm";
import { makeStyles } from "@material-ui/core/styles";
import MaterialPaper from "../../common/MaterialPaper";
import { Typography, Divider } from "@material-ui/core";
import MaterialButton from "../../common/MaterialButton";
import MaterialTextField from "../../common/MaterialTextField";
import loginFormValidate from "./validation/loginFormValidate";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  containerTopMargin: {
    marginTop: "-130px",
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  login__button: {
    borderRadius: 16,
    textTransform: "capitalize",
    width: "100%",
  },
  textField: {
    [`& fieldset`]: {
      borderRadius: 16,
    },
  },
  login__paper: {
    boxShadow: "none",
    borderRadius: 16,
    backgroundColor: "rgb(232, 244, 253)",
  },
  login__icon: {
    fill: "#99CFF9",
    paddingRight: "1rem",
  },
  loginBottom__info: {
    marginTop: ".15rem",
  },
  loginDiv__margin: {
    marginTop: "20px",
  },
}));

const paperText = (
  <Typography
    variant="inherit"
    gutterBottom
    className={useStyles["loginBottom__info"]}
  >
    You can use your <strong>email address</strong> or{" "}
    <strong>username </strong>
    as the credentials!
  </Typography>
);

export default function Login() {
  //..
  const { handleChange, values, handleSubmit, errors } =
    useLoginForm(loginFormValidate);

  const classes = useStyles();

  if (auth.IsLoggedIn()) return <Redirect to="/" />;

  return (
    <div className="login-container">
      <div className="login-header__icon">
        <div className="login-logo">
          <logo.ApSoftwareLogo />
        </div>
      </div>
      <section className="login">
        <div className="loginContainer">
          <div className="login-header">
            <div className="login-header__text">
              <Typography variant="h5" component="h5">
                Log In
              </Typography>
              <p className="login-header__span">
                Log in on the internal platform
              </p>
            </div>
            <div className="login-logo-client">
              <logo.AnilaoLogo />
            </div>
          </div>

          <div className="login-formContainer">
            <form onSubmit={handleSubmit}>
              <MaterialTextField
                id="username"
                label="Username"
                margin="normal"
                classes={`login_input ${classes.textField}`}
                handleChange={handleChange}
                errors={errors.username}
                values={values.username}
              />

              <MaterialTextField
                id="password"
                label="Password"
                type="password"
                margin="normal"
                classes={`login_input ${classes.textField}`}
                handleChange={handleChange}
                errors={errors.password}
                values={values.password}
              />

              <div className={classes.loginDiv__margin}>
                <MaterialButton
                  onClick={handleSubmit}
                  classes={classes.login__button}
                  text="Log In"
                />
              </div>
              <div className={classes.loginDiv__margin}>
                <MaterialPaper text={paperText} />
              </div>
              <Divider className={classes.loginDiv__margin} />
              <Typography
                className={classes.loginDiv__margin}
                variant="body2"
                color="textSecondary"
              >
                Forgot Password
              </Typography>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
