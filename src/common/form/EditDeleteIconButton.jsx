import React from "react";
import { Link } from "react-router-dom";
import { RiEditBoxFill, RiDeleteBin7Fill } from "react-icons/ri";
import { IconButton, Tooltip } from "@material-ui/core";

const EditDeleteIconButton = (props) => {
  const { rowId, handleDelete, linkPath } = props;
  return (
    <>
      <Link to={linkPath}>
        <Tooltip title="Edit" placement="top">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            className="navbar_iconBtn"
          >
            <RiEditBoxFill color="rgb(86, 100, 210)" />
          </IconButton>
        </Tooltip>
      </Link>
      <Tooltip title="Delete" placement="top">
        <IconButton
          style={{ paddingLeft: "15px" }}
          edge="start"
          color="inherit"
          aria-label="menu"
          className="navbar_iconBtn"
          onClick={() => handleDelete(rowId)}
        >
          <RiDeleteBin7Fill color="#ff6e40" />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default EditDeleteIconButton;
