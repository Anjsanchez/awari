export default function PaymentFormValidate(values) {
  let errors = {};

  if (!values.name.trim()) errors.name = "Payment name is required";

  return errors;
}
