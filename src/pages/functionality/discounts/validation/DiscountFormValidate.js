export default function DiscountFormValidate(values) {
  let errors = {};

  if (!values.name.trim()) errors.name = "Discount name is required";

  if (values.value === "" || values.value === null)
    errors.value = "Discount value is required";

  return errors;
}
