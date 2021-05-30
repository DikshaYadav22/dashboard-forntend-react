import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import axios from "axios";

const Login = () => {
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
      setLoginData({
        email: "",
        password: "",
      });
    } else {
      console.log(res.data);
    }
  };
  return (
    <div className="mt-5">
      <Form>
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
            placeholder="with a placeholder"
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
            placeholder="password placeholder"
          />
        </FormGroup>

        <Button onClick={loginUser} color="success">
          Login
        </Button>
      </Form>
    </div>
  );
};
export default Login;
