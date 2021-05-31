import { useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
const Logout = () => {
  let history = useHistory();
  useEffect(() => {
    logout();
  }, []);
  const logout = () => {
    localStorage.clear();
    history.push("/login");
  };
  return <Redirect to="/login" />;
};

export default Logout;
