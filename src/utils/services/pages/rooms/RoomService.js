import http from "../../httpServices";
import { apiUrl } from "../../../../config/config.json";

const apiEndpoint = apiUrl + "/rooms";

function roomUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getRooms() {
  http.SetJwt();
  return http.get(apiEndpoint);
}

export function GetRoomWithPricing() {
  http.SetJwt();
  return http.get(apiEndpoint + "/byPricingAvailable");
}

export function saveRoom(room) {
  http.SetJwt();
  if (room.id) {
    const body = { ...room };
    // delete body._id;
    return http.put(roomUrl(room.id), body);
  }
  return http.post(apiEndpoint, room);
}
