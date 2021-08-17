import { useSnackbar } from "notistack";
import { useState, useEffect, useRef } from "react";
import auth from "../../../utils/services/authServices";
import { useLocation, useHistory } from "react-router-dom";
import { store } from "../../../utils/store/configureStore";
import { userAdded } from "../../../utils/store/pages/users";

const useLoginForm = (validate) => {
  //..
  const hist = useHistory();
  const didMount = useRef(false);
  const location = useLocation();
  const [errors, setErrors] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  useEffect(() => {
    async function fetchData() {
      if (!didMount.current) {
        didMount.current = true;
        return;
      }

      if (errors.username || errors.password) return;

      try {
        const { username, password } = values;

        const data = await auth.login(username, password);

        store.dispatch(userAdded({ data }));

        let pathToRelocate;
        if (location.state) pathToRelocate = location.state.from.pathname;
        else pathToRelocate = "/";
        hist.push(pathToRelocate);
      } catch (ex) {
        if (ex && ex.status === 400) {
          enqueueSnackbar(ex.data, { variant: "error" });
        }
        if (ex && ex.status === 500)
          enqueueSnackbar(ex.data, { variant: "error" });
      }
    }
    fetchData();
    // eslint-disable-next-line
  }, [errors]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors(validate(values));
  };

  return { handleChange, values, handleSubmit, errors };
};

export default useLoginForm;
