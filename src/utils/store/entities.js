import { combineReducers } from "redux";
import userReducer from "./pages/users";
import roomVariantReducer from "./pages/roomVariant";
import RoomReservationReducer from "./pages/RoomReservation";

export default combineReducers({
  user: userReducer,
  roomVariant: roomVariantReducer,
  createReservation: RoomReservationReducer,
});
