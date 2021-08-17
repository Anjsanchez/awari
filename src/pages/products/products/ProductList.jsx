import React from "react";
import FormList from "../../../common/form/FormList";

const ProductList = ({ data, onDelete, onView }) => {
  return (
    <>
      <FormList
        data={data}
        onView={onView}
        onDelete={onDelete}
        displayField="longName"
        hasAditionalField={{
          value: true,
          field: "name",
          additionalText: "",
          bracketFieldAdtl: "productCategory",
        }}
      />
    </>
  );
};

export default ProductList;
