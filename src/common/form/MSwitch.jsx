import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Switch } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
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
}));

const MSwitch = (props) => {
  const {
    values,
    handleChange,
    name,
    switchName = "isActive",
    subName,
    showSwitch = true,
  } = props;
  const classes = useStyles();

  return (
    <div className="">
      <span className={classes.employeeFormInfo_header}>{name}</span>
      <div className="">
        <span className={classes.employeeFormInfo_helper}>{subName}</span>
      </div>
      {showSwitch && (
        <div>
          <Switch
            checked={values}
            className={classes.employeeFormInfo_switch}
            onChange={handleChange}
            color="primary"
            name={switchName}
            value={values}
            id={switchName}
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        </div>
      )}
    </div>
  );
};

export default MSwitch;
