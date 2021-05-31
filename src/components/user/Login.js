import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import { Redirect, useHistory } from "react-router-dom";

const Login = () => {
  let history = useHistory();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = loginData;

  const loginUser = async () => {
    const url = process.env.REACT_APP_AUTH_API;
    const res = await axios.post(`${url}/login`, loginData);
    if (res.data) {
      let userData = {
        token: res.data.access_token,
        expiry: res.data.expires_at,
        type: res.data.token_type,
      };
      localStorage.setItem("clientData", JSON.stringify(userData));
      history.push("/");

      setLoginData({
        email: "",
        password: "",
      });
    } else {
      console.log(res.data);
    }
  };

  return (
    <div className="mainDesign">
      <h1 className="titleDesgin">Sign In</h1>
      <Form className="login-design">
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) =>
              setLoginData({ ...loginData, email: e.target.value })
            }
            name="email"
            id="email"
            placeholder="Enter email"
          />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input
            type="password"
            name="password"
            value={password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
            id="examplePassword"
            placeholder="Enter Password"
          />
        </FormGroup>

        <FormGroup>
          <Input type="checkbox" className="ml-3" />
          <Label for="remember" className="ml-5 font-weight-normal">
            Remember me
          </Label>
        </FormGroup>

        <Button onClick={loginUser} className="loginBtn ">
          Login
        </Button>
        <div className="text-right font-weight-normal p-3">
          <a href="#">Forgot Password?</a>
        </div>
      </Form>
    </div>
  );
};

export default Login;
