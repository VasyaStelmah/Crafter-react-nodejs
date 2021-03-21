import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { signup, signin } from "../actions/auth";
import {
  Container,
  Button,
  Row,
  Col,
  Card,
  Form,
  FormGroup,
  ButtonGroup,
} from "react-bootstrap";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(form, history));
    } else {
      dispatch(signin(form, history));
    }
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: "AUTH", data: { result, token } });

      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = () =>
    alert("Google Sign In was unsuccessful. Try again later");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Container>
      <Row>
        <Col></Col>
        <Col>
          <h3>{isSignup ? "Sign up" : "Sign in"}</h3>
          <Form onSubmit={handleSubmit}>
            {isSignup && (
              <FormGroup>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  placeholder="Enter First Name"
                  name="firstName"
                  label="First Name"
                  onChange={handleChange}
                />
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  placeholder="Enter Last Name"
                  name="lastName"
                  label="Last Name"
                  onChange={handleChange}
                />
              </FormGroup>
            )}
            <FormGroup>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                placeholder="Enter Email Address"
                name="email"
                label="Email Address"
                onChange={handleChange}
                type="email"
              />
              <Form.Label>Password</Form.Label>
              <Form.Control
                placeholder="Enter Password"
                name="password"
                label="Password"
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
              />
            </FormGroup>
            {isSignup && (
              <FormGroup>
                <Form.Label>Repeat Password</Form.Label>
                <Form.Control
                  placeholder="Enter Repeat Password"
                  name="confirmPassword"
                  label="Repeat Password"
                  onChange={handleChange}
                  type="password"
                />
              </FormGroup>
            )}
            <FormGroup>
              <Button block type="submit" color="primary" size="lg">
                {isSignup ? "Sign Up" : "Sign In"}
              </Button>
            </FormGroup>
            <FormGroup>
              <GoogleLogin
                clientId="620661887004-66gh28q2v682kc05gaut9fk39le67407.apps.googleusercontent.com"
                render={(renderProps) => (
                  <Button
                    block
                    color="primary"
                    size="lg"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    Google Sign In
                  </Button>
                )}
                onSuccess={googleSuccess}
                onFailure={googleError}
                cookiePolicy="single_host_origin"
              />
            </FormGroup>
            <FormGroup>
              <Button block color="primary" size="lg" onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign Up"}
              </Button>
            </FormGroup>
          </Form>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default SignUp;
