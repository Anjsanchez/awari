import React from "react";
import { RiFilter3Fill } from "react-icons/ri";
import MaterialButton from "../MaterialButton";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { IconButton, Tooltip, Collapse, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  roomVariant_container: {
    background: "#fff",
    padding: "15px 20px 15px 20px",
  },
  roomVariantChild_container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#fff",
  },
  autoComplete: {
    width: "100%",
    marginTop: "20px",
    background: "rgb(250, 250, 250)",
  },
  option: {
    fontSize: "0.875rem;",
    "&:hover": {
      backgroundColor: "#EDF7FE !important",
    },
  },
  inputRoot: {
    color: "black",
    fontWeight: 500,
    borderRadius: "16px",
    fontFamily: `"Poppins", sans-serif`,
  },
  groupLabel: {
    fontSize: "0.875rem;",
  },
}));

const MSearchBar = ({ onAdd, data, onSearch, searchField }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(false);

  const options = data.map((option) => {
    const firstLetter = option[searchField][0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
      ...option,
    };
  });

  const handleClickListItem = () => setAnchorEl(!anchorEl);

  return (
    <div className={classes.roomVariant_container}>
      <div className={classes.roomVariantChild_container}>
        <MaterialButton
          onClick={onAdd}
          text="Add"
          color="primary"
          style={{ maxHeight: "38px" }}
        />
        <Tooltip title="Filter" placement="top">
          <IconButton
            style={{ paddingLeft: "15px" }}
            edge="start"
            color="inherit"
            aria-label="menu"
            className="navbar_iconBtn"
            aria-controls="customized-menu"
            onClick={handleClickListItem}
          >
            <RiFilter3Fill color="#757575" />
          </IconButton>
        </Tooltip>
      </div>

      <Collapse in={anchorEl}>
        <Autocomplete
          style={{ paddingTop: "15px" }}
          classes={{
            option: classes.option,
            groupLabel: classes.groupLabel,
            inputRoot: classes.inputRoot,
          }}
          getOptionSelected={(option, value) => option._id === value._id}
          id="grouped-demo"
          options={options.sort(
            (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
          )}
          groupBy={(option) => option.firstLetter}
          getOptionLabel={(option) => option[searchField]}
          renderInput={(params) => (
            <TextField {...params} label="Search" variant="outlined" />
          )}
          onChange={onSearch}
        />
      </Collapse>
    </div>
  );
};

export default MSearchBar;
