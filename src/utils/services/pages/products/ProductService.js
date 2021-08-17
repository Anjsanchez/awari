import http from "../../httpServices";
import { apiUrl } from "../../../../config/config.json";

const apiEndpoint = apiUrl + "/products";

function productUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getProducts() {
  http.SetJwt();
  return http.get(apiEndpoint);
}

export function saveProduct(product) {
  http.SetJwt();
  if (product.id) {
    const body = { ...product };
    // delete body._id;
    return http.put(productUrl(product.id), body);
  }
  return http.post(apiEndpoint, product);
}
