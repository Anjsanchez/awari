import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Toolbar } from "@material-ui/core";
import SearchBar from "material-ui-search-bar";
import "./MTableToolbar.css";

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    padding: "24px 24px",
    display: "flex",
    justifyContent: "space-between",
  },
  title: {
    paddingLeft: "24px",
  },
  searchBtn: {
    boxShadow: "none",
    borderRadius: "12px",
    display: "inline-flex",
    color: "rgb(97, 97, 97)",
    background: "rgb(250, 250, 250)",
    border: "0.01em solid rgb(97, 97, 97)",
  },
}));

const MTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected, searched, requestSearch, cancelSearch } = props;

  return (
    <>
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        <span className="toolbar-header_span">List</span>
        <div className={classes.title}>
          <SearchBar
            value={searched}
            onChange={(searchVal) => requestSearch(searchVal)}
            onCancelSearch={() => cancelSearch()}
            className={`toolbar-header_search ${classes.searchBtn}`}
          />
        </div>
      </Toolbar>
    </>
  );
};

MTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default MTableToolbar;
