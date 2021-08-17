export default function RoomPricingFormValidate(values) {
  let errors = {};

  if (values.capacity === "" || values.capacity === null)
    errors.capacity = "Capacity is required";

  if (values.sellingPrice === "" || values.sellingPrice === null)
    errors.sellingPrice = "Capacity is required";

  if (!values.roomId.trim()) errors.roomId = "Room is required";

  return errors;
}
