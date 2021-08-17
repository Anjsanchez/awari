import axios from "axios";
import logger from "./logServices";
import { store } from "../store/configureStore";

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.message === "Network Error")
      throw new Error({
        data: "Server Error. Please contact administrator",
        status: 500,
      });

    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    if (!expectedError) {
      logger.log("unexpected: " + error);
    }
    return Promise.reject(error.response);
  }
);

function SetJwt(jwt) {
  const userToken = store.getState().entities.user.token;

  if (userToken) axios.defaults.headers.Authorization = "Bearer " + userToken;
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  SetJwt,
};

export default http;
