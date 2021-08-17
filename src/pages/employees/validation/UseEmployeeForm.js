import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { saveEmployee } from "../../../utils/services/pages/EmployeeService";

const UseEmployeeForm = (validate) => {
  //..
  const hist = useHistory();
  const didMount = useRef(false);
  const [errors, setErrors] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [askConfirmation, setAskConfirmation] = useState(false);

  const [values, setValues] = useState({
    id: "",
    username: "",
    emailAddress: "",
    firstname: "",
    lastname: "",
    isActive: false,
    roleId: "",
    password: "",
    password2: "",
  });

  const handleValueOnLoad = (employee) => {
    setValues({
      id: employee.id || "",
      isActive: employee.isActive || false,
      username: employee.username || "",
      emailAddress: employee.emailAddress || "",
      firstname: employee.firstName || "",
      lastname: employee.lastName || "",
      password: employee.password || "updateonlynopasswordreq",
      password2: employee.password || "updateonlynopasswordreq",
      roleId: employee.role.id || "",
    });
  };

  useEffect(() => {
    //..
    async function doSubmit() {
      //..
      if (!didMount.current) {
        didMount.current = true;
        return;
      }

      if (Object.keys(errors).length === 0) setAskConfirmation(true);
    }
    doSubmit();
    // eslint-disable-next-line
  }, [errors]);

  const handleDialogProceed = async () => {
    setAskConfirmation(false);
    setIsLoading(true);
    try {
      const objEmp = { ...values };
      await saveEmployee(objEmp);
      enqueueSnackbar("Successfully updated records!", { variant: "success" });
      setIsLoading(false);
      hist.push("/user-management/employees");
    } catch (ex) {
      //
      if (ex && ex.status === 400)
        enqueueSnackbar(ex.data, { variant: "error" });
      if (ex && ex.status === 500)
        enqueueSnackbar(ex.data, { variant: "error" });

      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "isActive") {
      setValues({ ...values, [name]: e.target.checked });
      return;
    }

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleDialogCancel = () => {
    setAskConfirmation(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors(validate(values));
  };

  return {
    handleChange,
    values,
    handleSubmit,
    askConfirmation,
    errors,
    handleValueOnLoad,
    handleDialogProceed,
    handleDialogCancel,
    isLoading,
  };
};

export default UseEmployeeForm;
