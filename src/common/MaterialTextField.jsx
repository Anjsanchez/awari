import { TextField, FormControl } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  textField: {
    [`& fieldset`]: {
      borderRadius: 16,
    },
  },
}));

const MaterialTextField = (props) => {
  const classes = useStyles();

  const {
    label,
    id,
    values,
    handleChange,
    errors,
    type = "text",
    margin = "none",
    multiline = false,
  } = props;

  return (
    <FormControl fullWidth margin={margin}>
      <TextField
        multiline={multiline}
        id={id}
        name={id}
        rows={multiline === true ? 3 : 1}
        label={label}
        value={values}
        type={type}
        error={errors && true}
        className={classes.textField}
        onChange={handleChange}
        helperText={errors}
        autoComplete="false"
        variant="outlined"
      />
    </FormControl>
  );
};

export default MaterialTextField;
