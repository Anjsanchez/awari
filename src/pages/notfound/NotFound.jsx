import React from "react";
import { Result, Button } from "antd";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Link to="/" onClick={() => console.log("hey")}>
            <Button key="buy">Home</Button>
          </Link>
        }
      />
    </>
  );
};

export default NotFound;
