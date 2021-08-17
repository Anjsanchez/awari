import React from "react";
import { Button, CircularProgress } from "@material-ui/core";

const MaterialButton = (props) => {
  const {
    size = "large",
    classes,
    text,
    disabled = false,
    color = "primary",
    ...rest
  } = props;

  if (disabled)
    return (
      <Button
        disabled={disabled}
        color={color}
        size={size}
        startIcon={null}
        {...rest}
      >
        <CircularProgress size={15} color={color} />
      </Button>
    );

  return (
    <Button
      type="button"
      variant="contained"
      color={color}
      size={size}
      className={classes}
      {...rest}
    >
      {text}
    </Button>
  );
};

export default MaterialButton;
