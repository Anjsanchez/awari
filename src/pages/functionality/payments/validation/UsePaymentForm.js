import { useSnackbar } from "notistack";
import { useState, useEffect, useRef } from "react";
import { savePayment } from "../../../../utils/services/pages/functionality/PaymentService";
import { store } from "../../../../utils/store/configureStore";
import {
  requestStarted,
  requestFinished,
} from "../../../../utils/store/pages/roomVariant";
import { writeToken } from "../../../../utils/store/pages/users";

const UsePaymentForm = (validate, onSuccessEdit, onSuccessAdd) => {
  //..
  const didMount = useRef(false);
  const [errors, setErrors] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  const [askConfirmation, setAskConfirmation] = useState(false);

  const [values, setValues] = useState({
    id: "",
    name: "",
    isActive: false,
    isNeedRefNumber: false,
    createdBy: "",
    createdDate: "",
  });

  const handleValueOnLoad = (payment) => {
    setValues({
      id: payment._id || "",
      isActive: payment.isActive || false,
      isNeedRefNumber: payment.isNeedRefNumber || false,
      name: payment.name || "",
      createdDate: payment.createdDate || "",
      createdBy: payment.user.firstName + " " + payment.user.lastName || "",
    });
  };

  const handleDialogProceed = async () => {
    //
    setAskConfirmation(false);
    store.dispatch(requestStarted());

    try {
      const currentUser = store.getState().entities.user.user.id;
      const objEmp = { ...values, userId: currentUser };

      const { data } = await savePayment(objEmp);
      const { token, singleRecord } = data;

      store.dispatch(writeToken({ token }));

      enqueueSnackbar("Successfully updated records!", { variant: "success" });
      if (objEmp.id) return onSuccessEdit(objEmp);

      return onSuccessAdd(singleRecord);
    } catch (ex) {
      if (ex && ex.status === 400) {
        enqueueSnackbar(ex.data, { payment: "error" });
      }
      if (ex && ex.status === 500)
        enqueueSnackbar(ex.data, { payment: "error" });
    } finally {
      store.dispatch(requestFinished());
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "isActive" || name === "isNeedRefNumber") {
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

  return {
    handleChange,
    values,
    handleSubmit,
    errors,
    handleValueOnLoad,
    askConfirmation,
    handleDialogProceed,
    handleDialogCancel,
  };
};

export default UsePaymentForm;
