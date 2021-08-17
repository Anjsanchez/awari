import { apiUrl } from "../../../config/config.json";
import http from "./../httpServices";

const apiEndpoint = apiUrl + "/roles";

export function getRoles() {
  http.SetJwt();
  return http.get(apiEndpoint);
}
