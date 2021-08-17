import http from "./../httpServices";
import { apiUrl } from "../../../config/config.json";

const apiEndpoint = apiUrl + "/users";

function employeeUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getEmployees() {
  http.SetJwt();

  return http.get(apiEndpoint);
}

export function getEmployeeById(id) {
  http.SetJwt();
  return http.get(employeeUrl(id));
}

export function saveEmployee(employee) {
  http.SetJwt();
  if (employee.id) {
    const body = { ...employee };

    return http.put(employeeUrl(employee.id), body);
  }

  return http.post(apiEndpoint, employee);
}
