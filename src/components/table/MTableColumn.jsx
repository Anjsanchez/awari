import React from "react";
import PropTypes from "prop-types";
import {
  TableHead,
  TableSortLabel,
  TableCell,
  TableRow,
} from "@material-ui/core";

const MTableColumn = (props) => {
  const { classes, order, orderBy, headCells, onRequestSort } = props;

  const RenderSortLabel = (e) => {
    const { id, enableSort } = e.headCell;

    if (enableSort) {
      return (
        <TableSortLabel
          active={orderBy === id}
          direction={orderBy === id ? order : "asc"}
          onClick={createSortHandler(id)}
        >
          <RenderLabel headCell={e.headCell} />
        </TableSortLabel>
      );
    }

    return <RenderLabel headCell={e.headCell} />;
  };

  const RenderLabel = (e) => {
    const { label, id } = e.headCell;

    return (
      <>
        <span className={classes.colSpan}>{label}</span>
        {orderBy === id ? (
          <span className={classes.visuallyHidden}>
            {order === "desc" ? "sorted descending" : "sorted ascending"}
          </span>
        ) : null}
      </>
    );
  };

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <RenderSortLabel headCell={headCell} />
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

MTableColumn.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default MTableColumn;
