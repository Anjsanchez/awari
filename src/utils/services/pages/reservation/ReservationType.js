import http from "../../httpServices";
import { apiUrl } from "../../../../config/config.json";

const apiEndpoint = apiUrl + "/ReservationTypes";

export function GetReservationTypes() {
  http.SetJwt();
  return http.get(apiEndpoint);
}
