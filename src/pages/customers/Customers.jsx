import React from "react";
import CustomerTable from "./CustomerTable";
import { RiUserSmileFill } from "react-icons/ri";
import FormHeader from "./../../common/form/FormHeader";

const Customers = () => {
  return (
    <div className="component-main_container">
      <FormHeader
        header="Customers"
        second="User Management"
        third="Customer"
        navigate="/a/user-management/customers/new"
        SecondIcon={RiUserSmileFill}
      />
      <CustomerTable />
    </div>
  );
};

export default Customers;
