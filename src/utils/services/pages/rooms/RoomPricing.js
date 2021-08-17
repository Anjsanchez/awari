import http from "../../httpServices";
import { apiUrl } from "../../../../config/config.json";

const apiEndpoint = apiUrl + "/roomPricings";

function roomPricing(id) {
  return `${apiEndpoint}/${id}`;
}

export function getRoomPricings() {
  http.SetJwt();
  return http.get(apiEndpoint);
}

export function getRoomPricingsByVariantId(variantId) {
  http.SetJwt();
  return http.get(`${apiEndpoint}/byRoomVariant?variantId=${variantId}`);
}

export function saveRoomPricing(room) {
  http.SetJwt();
  if (room.id) {
    const body = { ...room };
    // delete body._id;
    return http.put(roomPricing(room.id), body);
  }
  return http.post(apiEndpoint, room);
}
