import http from "../../httpServices";
import { apiUrl } from "../../../../config/config.json";

const apiEndpoint = apiUrl + "/roomvariants";

function roomVariantUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getRoomVariants() {
  http.SetJwt();
  return http.get(apiEndpoint);
}

export function getActiveVariants() {
  http.SetJwt();
  return http.get(apiEndpoint + "/active-variants");
}

export function saveRoomVariant(variant) {
  http.SetJwt();
  if (variant.id) {
    const body = { ...variant };
    // delete body._id;
    return http.put(roomVariantUrl(variant.id), body);
  }
  return http.post(apiEndpoint, variant);
}
