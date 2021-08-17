export default function VariantFormValidate(values) {
  let errors = {};

  if (!values.name.trim()) errors.name = "Variant name is required";

  return errors;
}
