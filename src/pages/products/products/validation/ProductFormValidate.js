export default function ProductFormValidate(v) {
  let errors = {};

  if (!v.shortName.trim())
    errors.shortName = "Product's short name is required";

  if (!v.longName.trim()) errors.longName = "Product's long name is required";

  if (v.numberOfServing === "" || v.numberOfServing === null)
    errors.numberOfServing = "Number of servings is required";

  if (v.sellingPrice === "" || v.sellingPrice === null)
    errors.sellingPrice = "Selling Price is required";

  if (!v.productCategoryId.trim())
    errors.productCategoryId = "Product Category is required";

  return errors;
}
