import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";

const AuthenticatedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("clientData") ? (
          <Component />
        ) : (
          <Redirect to={{ pathname: "/login" }} />
        )
      }
    />
  );
};
export default AuthenticatedRoute;
