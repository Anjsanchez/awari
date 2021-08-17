import React from "react";
import "./css/FormList.css";
import ActiveButton from "./ActiveButton";
import { useSelector } from "react-redux";
import MaterialButton from "./../MaterialButton";
import { Paper, ButtonGroup, Divider } from "@material-ui/core";

const FormList = ({
  data,
  onDelete,
  onView,
  displayField,
  bracketField = "",
  hasAditionalField = {
    value: false,
    field: "roomLongName",
    additionalText: "w",
    bracketFieldAdtl: "",
  },
}) => {
  const RenderAditionalField = (renderData) => {
    const { value, field, additionalText, bracketFieldAdtl } =
      hasAditionalField;

    if (!value) return null;

    if (!bracketFieldAdtl)
      return (
        <div className="formList-subheader_span">
          {additionalText + " " + renderData.data[field]}
        </div>
      );

    return (
      <div className="formList-subheader_span">
        {additionalText + " " + renderData.data[bracketFieldAdtl][field]}
      </div>
    );
  };

  const RenderSpanField = (renderData) => {
    if (bracketField === "")
      return (
        <span className="formList-header_span">
          {renderData.data[displayField]}
        </span>
      );

    return (
      <span className="formList-header_span">
        {renderData.data[bracketField][displayField]}
      </span>
    );
  };
  const RenderView = (renderData) => {
    const { isActive } = renderData.data;

    const isLoading = useSelector(
      (state) => state.entities.roomVariant.isLoading
    );

    return (
      <div className="formList-container_wrap">
        <RenderSpanField data={renderData.data} />

        <RenderAditionalField data={renderData.data} />

        <div className="formList-button_wrapper">
          <ActiveButton value={isActive} />
          <div>
            <ButtonGroup
              variant="text"
              color="primary"
              aria-label="text primary button group"
            >
              <MaterialButton
                disabled={isLoading}
                text="Delete"
                color="secondary"
                onClick={() => onDelete(renderData.data)}
              />
              <MaterialButton
                disabled={isLoading}
                text="View"
                color="primary"
                onClick={() => onView(renderData.data)}
              />
            </ButtonGroup>
          </div>
        </div>
        <Divider />
      </div>
    );
  };

  return (
    <Paper elevation={0} square className="formList-container">
      {data.map((n) => (
        <RenderView key={n._id} data={n} />
      ))}
    </Paper>
  );
};

export default FormList;
