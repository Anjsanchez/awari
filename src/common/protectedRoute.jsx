import React from "react";
import { Route, Redirect } from "react-router-dom";
import { store } from "../utils/store/configureStore";

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!store.getState().entities.user.isLoggedIn)
          return (
            <Redirect
              to={{
                pathname: "/a/login",
                state: { from: props.location },
              }}
            />
          );
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
