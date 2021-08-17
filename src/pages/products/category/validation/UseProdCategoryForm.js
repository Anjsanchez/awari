import { useSnackbar } from "notistack";
import { useState, useEffect, useRef } from "react";
import { store } from "../../../../utils/store/configureStore";
import { writeToken } from "../../../../utils/store/pages/users";
import { saveProdCategory } from "../../../../utils/services/pages/products/ProductCategoryService";
import {
  requestStarted,
  requestFinished,
} from "../../../../utils/store/pages/roomVariant";

const UseProdCategoryForm = (validate, onSuccessEdit, onSuccessAdd) => {
  //..
  const didMount = useRef(false);
  const [errors, setErrors] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  const [askConfirmation, setAskConfirmation] = useState(false);

  const [values, setValues] = useState({
    id: "",
    name: "",
    isActive: false,
    createdBy: "",
    createdDate: "",
  });

  const handleValueOnLoad = (category) => {
    setValues({
      id: category._id || "",
      isActive: category.isActive || false,
      name: category.name || "",
      createdDate: category.createdDate || "",
      createdBy: category.user.firstName + " " + category.user.lastName || "",
    });
  };

  const handleDialogProceed = async () => {
    //
    setAskConfirmation(false);
    store.dispatch(requestStarted());

    try {
      const currentUser = store.getState().entities.user.user.id;
      const objEmp = { ...values, userId: currentUser };

      const { data } = await saveProdCategory(objEmp);
      const { token, singleRecord } = data;

      store.dispatch(writeToken({ token }));

      enqueueSnackbar("Successfully updated records!", { variant: "success" });
      if (objEmp.id) return onSuccessEdit(objEmp);

      return onSuccessAdd(singleRecord);
    } catch (ex) {
      if (ex && ex.status === 400) {
        enqueueSnackbar(ex.data, { variant: "error" });
      }
      if (ex && ex.status === 500)
        enqueueSnackbar(ex.data, { variant: "error" });
    } finally {
      store.dispatch(requestFinished());
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

export default UseProdCategoryForm;
