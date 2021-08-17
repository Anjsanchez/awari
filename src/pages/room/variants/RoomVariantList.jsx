import React from "react";
import FormList from "./../../../common/form/FormList";

const RoomVariantList = ({ data, onDelete, onView }) => {
  //..
  // if (data.length === 0) return <h1>No Records available</h1>;

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

export default RoomVariantList;
