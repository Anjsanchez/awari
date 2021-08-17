import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  employeeForm_input: {
    width: "100%",
  },
}));

const MaterialSelect = (props) => {
  const {
    label,
    value,
    handleChangeInput,
    errors,
    datas,
    displayText,
    menuItemValue,
    name,
    maxWidth = "200px",
  } = props;
  const classes = useStyles();

  if (Object.keys(datas).length === 0) return null;
  return (
    <FormControl
      error={errors && true}
      variant="outlined"
      className={classes.employeeForm_input}
      style={{ maxWidth: maxWidth }}
    >
      <InputLabel id="demo-simple-select-outlined-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={value}
        onChange={handleChangeInput}
        label={label}
        error={errors && true}
        size="small"
        name={name}
      >
        {datas.map((data) => (
          <MenuItem key={data[menuItemValue]} value={data[menuItemValue]}>
            {data[displayText]}
          </MenuItem>
        ))}
      </Select>
      {errors && <FormHelperText>{errors}</FormHelperText>}
    </FormControl>
  );
};

export default MaterialSelect;
