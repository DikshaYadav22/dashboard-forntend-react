import React from "react";
import NavBar from "./components/layout/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/user/Login";
import { Container } from "reactstrap";
import Register from "./components/user/Register";
import Posts from "./components/post/Posts";
import NewPost from "./components/post/NewPost";
import MainLayout from "./components/layout/MainLayout";
import Post from "./components/post/Post";

const App = () => {
  return (
    <>
      <Router basename="/">
        <NavBar />
        <Container>
          <Switch>
            <Route exact path="/" component={MainLayout} />
            <Route exact path="/post/:id" component={Post} />
            <Route exact path="/post/create" component={NewPost} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </Container>
      </Router>
    </>
  );
};

export default App;
