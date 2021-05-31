import React, { useState, useEffect } from "react";
import NavBar from "./components/layout/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/user/Login";
import { Container } from "reactstrap";
import Register from "./components/user/Register";
import NewPost from "./components/post/NewPost";
import MainLayout from "./components/layout/MainLayout";
import Post from "./components/post/Post";
import AuthenticatedRoute from "./components/protectedroutes/AuthenticatedRoute";
import Logout from "./components/user/Logout";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const clientData = localStorage.getItem("clientData");
    if (clientData) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      <Router basename="/">
        <NavBar isLoggedIn={isLoggedIn} />
        <Container>
          <Switch>
            <Route exact path="/login" component={Login} />
            <AuthenticatedRoute exact path="/post/create" component={NewPost} />
            <AuthenticatedRoute exact path="/post/:id" component={Post} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route
              exact
              path="/logout"
              component={() => (
                <Logout
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={(data) => setIsLoggedIn(data)}
                />
              )}
            />
          </Switch>
          <AuthenticatedRoute
            exact
            path="/"
            component={() => (
              <MainLayout setIsLoggedIn={(data) => setIsLoggedIn(data)} />
            )}
          />
        </Container>
      </Router>
    </>
  );
};

export default App;
