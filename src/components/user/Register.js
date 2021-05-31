import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Register = () => {
  let history = useHistory();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  let { name, email, password } = userData;
  const submitUserData = async () => {
    const url = process.env.REACT_APP_AUTH_API;
    const response = await axios.post(`${url}/register`, userData);
    console.log(response);

    setUserData({
      name: "",
      email: "",
      password: "",
    });
    history.push("/login");
  };
  return (
    <div className="mainDesign">
      <h1 className="titleDesgin">Sign Up</h1>
      <Form className="login-design">
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            name="name"
            id="name"
            placeholder="enter your username"
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
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
              setUserData({ ...userData, password: e.target.value })
            }
            id="examplePassword"
            placeholder="password placeholder"
          />
        </FormGroup>

        <Button onClick={submitUserData} className="loginBtn">
          Register
        </Button>
      </Form>
    </div>
  );
};

export default Register;
