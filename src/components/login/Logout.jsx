import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import auth from "./../../utils/services/authServices";
const Logout = () => {
  const hist = useHistory();

  useEffect(() => {
    auth.logout();

    hist.replace("/");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
};

export default Logout;
