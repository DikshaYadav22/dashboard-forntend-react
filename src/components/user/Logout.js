import { useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
const Logout = ({ setIsLoggedIn }) => {
  let history = useHistory();
  useEffect(() => {
    logout();
  }, []);
  const logout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    history.push("/login");
  };
  return <Redirect to="/login" />;
};

export default Logout;
