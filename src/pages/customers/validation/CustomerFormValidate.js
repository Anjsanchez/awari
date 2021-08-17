export default function customerFormValidate(values) {
  let errors = {};

  if (!values.customerid) errors.customerid = "Customer ID is required";
  if (!values.firstname.trim()) errors.firstname = "First name is required";
  if (!values.mobile) errors.mobile = "Mobile number is required";
  if (!values.lastname.trim()) errors.lastname = "Last name is required";
  if (!values.birthday) errors.birthday = "Birthday is required";
  if (!values.address.trim()) errors.address = "Address is required";
  if (!values.emailAddress) errors.emailAddress = "Email is required";
  else if (!/\S+@\S+\.\S+/.test(values.emailAddress))
    errors.emailAddress = "Please provide a valid email address.";

  return errors;
}
