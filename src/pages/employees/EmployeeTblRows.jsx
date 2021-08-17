import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import EditDeleteIconButton from "./../../common/form/EditDeleteIconButton";
import { TableBody, TableCell, TableRow, Checkbox } from "@material-ui/core";
import ActiveButton from "../../common/form/ActiveButton";

const useStyles = makeStyles((theme) => ({
  selected: {
    backgroundColor: "#F2F3FB !important",
  },
  popover: {
    pointerEvents: "none",
  },
  rowSpan: {
    fontFamily: `"Poppins", sans-serif`,
    fontSize: " 0.850rem",
    fontWeight: 400,
    color: "rgb(23, 43, 77)",
  },
  linkName: {
    display: "flex",
    textDecoration: "none",
    color: "rgb(86, 100, 210) !important",
    cursor: "pointer",
  },
}));

const EmployeeTblRows = (props) => {
  const classes = useStyles();

  const {
    order,
    rows,
    orderBy,
    page,
    rowsPerPage,
    handleClick,
    stableSort,
    getComparator,
    isSelected,
    emptyRows,
    handleDelete,
  } = props;

  return (
    <TableBody>
      {stableSort(rows, getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row, index) => {
          //..
          const isItemSelected = isSelected(row.id);
          const labelId = `enhanced-table-checkbox-${index}`;

          return (
            <TableRow
              hover
              onClick={(event) => handleClick(event, row.id)}
              role="checkbox"
              aria-checked={isItemSelected}
              tabIndex={-1}
              key={row.id}
              selected={isItemSelected}
              classes={{ selected: classes.selected }}
              style={
                index % 2 ? { background: "#fafafa" } : { background: "white" }
              }
            >
              <TableCell padding="checkbox" color="blue">
                <Checkbox
                  checked={isItemSelected}
                  inputProps={{ "aria-labelledby": labelId }}
                  color="primary"
                />
              </TableCell>
              <TableCell component="th" id={labelId} scope="row" padding="none">
                <Link
                  to={`/a/user-management/employees/${row.id}`}
                  className={`${classes.rowSpan} ${classes.linkName}`}
                >
                  {row.firstName} {row.lastName}
                </Link>
              </TableCell>
              <TableCell align="right">
                <span className={classes.rowSpan}>{row.username}</span>
              </TableCell>
              <TableCell align="right">
                <span className={classes.rowSpan}>{row.role.rolename}</span>
              </TableCell>
              <TableCell align="right">
                <ActiveButton value={row.isActive} />
              </TableCell>
              <TableCell align="right">
                <EditDeleteIconButton
                  rowId={row.id}
                  handleDelete={handleDelete}
                  linkPath={`/user-management/employees/${row.id}`}
                />
              </TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          );
        })}
      {emptyRows > 0 && (
        <TableRow style={{ height: 53 * emptyRows }}>
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </TableBody>
  );
};

export default EmployeeTblRows;
