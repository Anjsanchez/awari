import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { FaRegBookmark } from "react-icons/fa";

const useStyles = makeStyles((theme) => ({
  login__paper: {
    boxShadow: "none",
    borderRadius: 16,
    backgroundColor: "rgb(232, 244, 253)",
    fontFamily: `"Poppins", sans-serif`,
    fontWeight: 400,
    fontSize: "0.875rem",
    lineHeight: "1.43",
    display: "flex",
    padding: "12px 16px",
  },
  login__icon: {
    fill: "#99CFF9",
    paddingRight: "1rem",
    fontSize: "35px",
  },
  loginBottom__info: {
    marginTop: ".15rem",
  },
}));

const MaterialPaper = (props) => {
  const { text } = props;
  const classes = useStyles();

  return (
    <Paper className={classes.login__paper}>
      <FaRegBookmark className={classes.login__icon} />
      <Typography
        variant="inherit"
        gutterBottom
        className={classes.loginBottom__info}
      >
        {text}
      </Typography>
    </Paper>
  );
};

export default MaterialPaper;
