import http from "../../httpServices";
import { apiUrl } from "../../../../config/config.json";

const apiEndpoint = apiUrl + "/payments";

function paymentUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getPayments() {
  http.SetJwt();
  return http.get(apiEndpoint);
}

export function savePayment(payment) {
  http.SetJwt();
  if (payment.id) {
    const body = { ...payment };
    // delete body._id;
    return http.put(paymentUrl(payment.id), body);
  }
  return http.post(apiEndpoint, payment);
}
