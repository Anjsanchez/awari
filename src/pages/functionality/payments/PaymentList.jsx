import React from "react";
import FormList from "./../../../common/form/FormList";

const PaymentList = ({ data, onDelete, onView }) => {
  return (
    <div style={{ marginTop: "15px" }}>
      <FormList
        data={data}
        onView={onView}
        onDelete={onDelete}
        displayField="name"
      />
    </div>
  );
};

export default PaymentList;
