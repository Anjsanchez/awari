import React from "react";
import { Typography, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formFooter__margin: {
    marginTop: "20px",
  },
}));

const FormFooter = (props) => {
  const { text } = props;
  const classes = useStyles();
  return (
    <>
      <Divider className={classes.formFooter__margin} />
      <Typography
        className={classes.formFooter__margin}
        variant="body2"
        color="textSecondary"
      >
        {text}
      </Typography>
    </>
  );
};

export default FormFooter;
