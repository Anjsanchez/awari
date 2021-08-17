import MTableColumn from "./MTableColumn";
import MTableToolbar from "./MTableToolbar";
import MDialog from "./../../common/MDialog";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableContainer,
  TablePagination,
  Paper,
  Typography,
} from "@material-ui/core";
//..

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    paddingTop: "24px",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  footerDiv: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: "16px",
  },
  colSpan: {
    fontFamily: `"Poppins", sans-serif`,
    fontSize: " 0.875rem",
    fontWeight: 500,
    color: "rgb(23, 43, 77)",
  },
  footerdiv_selected: {
    fontFamily: `"Poppins", sans-serif`,
    fontSize: " 0.780rem",
    fontWeight: 300,
    color: "rgb(23, 43, 77)",
  },
  footerdiv_pagination: {
    fontFamily: `"Poppins", sans-serif`,
    fontSize: " 0.850rem",
    fontWeight: 400,
    color: "rgb(23, 43, 77)",
  },
}));

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] === undefined || a[orderBy] === undefined) return 0;

  if (b[orderBy].toString().toLowerCase() < a[orderBy].toString().toLowerCase())
    return -1;

  if (b[orderBy].toString().toLowerCase() > a[orderBy].toString().toLowerCase())
    return 1;

  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function MTable(props) {
  //..
  const classes = useStyles();
  const headCells = props.xCells;
  const { TblBody, rows } = props;

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [searched, setSearched] = useState("");
  const [orderBy, setOrderBy] = useState("calories");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [filteredRows, setFilteredRows] = useState([]);

  useEffect(() => {
    setFilteredRows(rows);
  }, [rows]);

  const requestSearch = (searchedVal) => {
    const filtered = rows.filter((row) => {
      const fullname =
        row.firstName.toLowerCase() + " " + row.lastName.toLowerCase();
      return fullname.includes(searchedVal.toLowerCase());
    });
    setFilteredRows(filtered);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleDelete = (rowId) => {
    setOpenDialog(!openDialog);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = name;
    } else if (selectedIndex === 0) {
      newSelected = selected.slice(1);
    } else if (selectedIndex === selected.length - 1) {
      newSelected = selected.slice(0, -1);
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const dialog = {
    title: "Are you sure you want to delete this specific record?",
    subTitle: "This action can't be undo once done. Are you sure?",
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <MDialog
          openDialog={openDialog}
          handleClose={handleDelete}
          dialogText={dialog}
        />
        <MTableToolbar
          searched={searched}
          requestSearch={requestSearch}
          cancelSearch={cancelSearch}
          numSelected={selected.length}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
            size="small"
          >
            <MTableColumn
              headCells={headCells}
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />

            <TblBody
              getComparator={getComparator}
              rows={filteredRows}
              stableSort={stableSort}
              order={order}
              orderBy={orderBy}
              isSelected={isSelected}
              emptyRows={emptyRows}
              page={page}
              rowsPerPage={rowsPerPage}
              handleClick={handleClick}
              handleDelete={handleDelete}
            />
          </Table>
        </TableContainer>
        <div className={classes.footerDiv}>
          <Typography
            color="inherit"
            variant="subtitle1"
            component="div"
            className={classes.footerdiv_selected}
          ></Typography>

          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            classes={{
              toolbar: classes.footerdiv_pagination,
              caption: classes.footerdiv_pagination,
            }}
          />
        </div>
      </Paper>
    </div>
  );
}
