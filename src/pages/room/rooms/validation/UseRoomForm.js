import { useSnackbar } from "notistack";
import { useState, useEffect, useRef } from "react";
import { store } from "../../../../utils/store/configureStore";
import { writeToken } from "../../../../utils/store/pages/users";
import { saveRoom } from "../../../../utils/services/pages/rooms/RoomService";
import {
  requestStarted,
  requestFinished,
} from "../../../../utils/store/pages/roomVariant";

const UseRoomForm = (validate, onSuccessEdit, onSuccessAdd) => {
  //..
  const didMount = useRef(false);
  const [errors, setErrors] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  const [askConfirmation, setAskConfirmation] = useState(false);

  const [values, setValues] = useState({
    id: "",
    searchName: "",
    roomLongName: "",
    costPrice: "0",
    minimumCapacity: "",
    maximumCapacity: "",
    numberOfRooms: "",
    isActive: false,
    isAllowExtraPax: false,
    isPerPaxRoomType: false,
    roomVariantId: "",
    createdBy: "",
    createdDate: "",
  });

  const handleValueOnLoad = (room) => {
    setValues({
      id: room._id || "",
      isActive: room.isActive || false,
      searchName: room.searchName || "",
      createdDate: room.createdDate || "",
      roomLongName: room.roomLongName || "",
      numberOfRooms: room.numberOfRooms || "",
      roomVariantId: room.roomVariant._id || "",
      maximumCapacity: room.maximumCapacity || "",
      minimumCapacity: room.minimumCapacity || "",
      isAllowExtraPax: room.isAllowExtraPax || false,
      isPerPaxRoomType: room.isPerPaxRoomType || false,
      createdBy: room.user.firstName + " " + room.user.lastName || "",
    });
  };

  const handleDialogProceed = async () => {
    //
    setAskConfirmation(false);
    store.dispatch(requestStarted());

    try {
      const currentUser = store.getState().entities.user.user.id;
      const objEmp = { ...values, userId: currentUser };

      const { data } = await saveRoom(objEmp);
      const { token, singleRecord } = data;
      store.dispatch(writeToken({ token }));

      enqueueSnackbar("Successfully updated records!", { variant: "success" });

      if (objEmp.id) return onSuccessEdit(objEmp);

      return onSuccessAdd(singleRecord);
    } catch (ex) {
      if (ex && ex.status === 400) {
      }
      if (ex && ex.status === 500)
        enqueueSnackbar(ex.data, { variant: "success" });
    } finally {
      store.dispatch(requestFinished());
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "isActive")
      return setValues({ ...values, [name]: e.target.checked });

    if (name === "isAllowExtraPax")
      return setValues({ ...values, [name]: e.target.checked });

    if (name === "isPerPaxRoomType")
      return setValues({ ...values, [name]: e.target.checked });

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

export default UseRoomForm;
