import http from "./../httpServices";
import { apiUrl } from "../../../config/config.json";

const apiEndpoint = apiUrl + "/customers";

function customerUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getCustomers() {
  http.SetJwt();
  return http.get(apiEndpoint);
}

export function getCustomerById(id) {
  http.SetJwt();
  return http.get(customerUrl(id));
}

export function saveCustomer(customer) {
  http.SetJwt();
  if (customer.id) {
    const body = { ...customer };
    // delete body._id;
    return http.put(customerUrl(customer.id), body);
  }
  return http.post(apiEndpoint, customer);
}
