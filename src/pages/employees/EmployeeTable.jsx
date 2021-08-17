import { useSnackbar } from "notistack";
import Loader from "../../common/Loader";
import { useMountedState } from "react-use";
import EmployeeTblRows from "./EmployeeTblRows";
import MTable from "../../components/table/MTable";
import React, { useEffect, useState } from "react";
import { store } from "../../utils/store/configureStore";
import { writeToken } from "../../utils/store/pages/users";
import { getEmployees } from "../../utils/services/pages/EmployeeService";
const headCells = [
  {
    id: "firstName",
    numeric: false,
    disablePadding: true,
    label: "Full name",
    enableSort: true,
  },
  {
    id: "username",
    numeric: true,
    disablePadding: false,
    label: "Username",
    enableSort: true,
  },
  {
    id: "rolename",
    numeric: true,
    disablePadding: false,
    label: "Role",
    enableSort: false,
  },
  {
    id: "isActive",
    numeric: true,
    disablePadding: false,
    label: "Status",
    enableSort: true,
  },
  {
    id: "Action",
    numeric: true,
    disablePadding: false,
    label: "Action",
    enableSort: false,
  },
  {
    id: "1",
    numeric: true,
    disablePadding: false,
    label: "",
    enableSort: false,
  },
];

const EmployeeTable = () => {
  //..
  const isMounted = useMountedState();
  const { enqueueSnackbar } = useSnackbar();
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    //..
    async function fetchData() {
      try {
        const { data } = await getEmployees();
        const { token, listRecords } = data;

        store.dispatch(writeToken({ token }));

        setTimeout(() => {
          if (isMounted()) setEmployees(listRecords);
        }, 500);
        //
      } catch (error) {
        enqueueSnackbar("An error occured while calling the server.", {
          variant: "error",
        });
        return () => {
          setEmployees({});
        };
      }
    }
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const RenderBody = () => {
    if (employees.length === 0) return <Loader />;

    return (
      <MTable rows={employees} xCells={headCells} TblBody={EmployeeTblRows} />
    );
  };

  return (
    <>
      <RenderBody />
    </>
  );
};

export default EmployeeTable;
