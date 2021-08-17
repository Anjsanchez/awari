export default function RoomFormValidate(values) {
  let errors = {};

  if (!values.searchName.trim()) errors.searchName = "Search name is required";
  if (!values.roomLongName.trim())
    errors.roomLongName = "Room name is required";

  if (values.numberOfRooms === "" || values.numberOfRooms === null)
    errors.numberOfRooms = "Number of Rooms is required";

  if (values.maximumCapacity === "" || values.maximumCapacity === null)
    errors.maximumCapacity = "Maximum Capacity is required";

  if (values.minimumCapacity === "" || values.minimumCapacity === null)
    errors.minimumCapacity = "Minimum Capacity is required";

  if (values.minimumCapacity !== "" && values.maximumCapacity !== "")
    if (values.minimumCapacity >= values.maximumCapacity)
      errors.minimumCapacity =
        "Minimum capacity can't be greater than Maximum capacity";

  if (!values.roomVariantId.trim())
    errors.roomVariantId = "Room Variant is required";

  return errors;
}
