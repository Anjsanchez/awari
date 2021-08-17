export default function ProdCategoryFormValidate(values) {
  let errors = {};

  if (!values.name.trim()) errors.name = "Category name is required";

  return errors;
}
