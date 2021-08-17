import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { store } from "../../../utils/store/configureStore";
import { saveCustomer } from "./../../../utils/services/pages/CustomerService";

const UseCustomerForm = (validate) => {
  //..
  const hist = useHistory();
  const didMount = useRef(false);
  const [errors, setErrors] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [askConfirmation, setAskConfirmation] = useState(false);

  const [values, setValues] = useState({
    id: "",
    customerid: "",
    emailAddress: "",
    firstname: "",
    lastname: "",
    isActive: false,
    mobile: "",
    birthday: new Date(),
    address: "",
    createdBy: "",
    createdDate: "",
  });

  const handleValueOnLoad = (customer) => {
    setValues({
      id: customer._id || "",
      isActive: customer.isActive || false,
      emailAddress: customer.emailAddress || "",
      firstname: customer.firstName || "",
      lastname: customer.lastName || "",
      customerid: customer.customerid || "",
      mobile: customer.mobile || "",
      birthday: customer.birthday || "",
      address: customer.address || "",
      createdDate: customer.createdDate || "",
      createdBy: customer.user.firstName + " " + customer.user.lastName || "",
    });
  };

  const handleDialogProceed = async () => {
    setAskConfirmation(false);
    setIsLoading(true);

    try {
      const currentUser = store.getState().entities.user.user.id;
      const objEmp = { ...values, userId: currentUser };

      await saveCustomer(objEmp);
      enqueueSnackbar("Successfully updated records!", { variant: "success" });
      hist.push("/user-management/customers");
    } catch (ex) {
      if (ex && ex.status === 400) {
        enqueueSnackbar(ex.data, { variant: "error" });
      }
      if (ex && ex.status === 500)
        enqueueSnackbar(ex.data, { variant: "error" });
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors(validate(values));
  };

  const handleDialogCancel = () => {
    setAskConfirmation(false);
  };

  const handleChangeBirthday = (value) => {
    setValues({ ...values, birthday: value });
  };

  return {
    handleChange,
    values,
    handleSubmit,
    errors,
    handleValueOnLoad,
    askConfirmation,
    handleDialogProceed,
    isLoading,
    handleDialogCancel,
    handleChangeBirthday,
  };
};

export default UseCustomerForm;
