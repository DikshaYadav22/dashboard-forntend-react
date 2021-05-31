import React from "react";
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
  return (
    <>
      <Router basename="/">
        <NavBar />
        <Container>
          <Switch>
            <Route exact path="/login" component={Login} />

            <AuthenticatedRoute exact path="/post/create" component={NewPost} />
            <AuthenticatedRoute exact path="/post/:id" component={Post} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/logout" component={Logout} />
          </Switch>
          <AuthenticatedRoute exact path="/" component={MainLayout} />
        </Container>
      </Router>
    </>
  );
};

export default App;
