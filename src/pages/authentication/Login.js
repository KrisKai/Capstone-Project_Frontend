import React from "react";
// material
import { styled } from "@mui/material/styles";
import {
  Badge,
  Button,
  Card,
  Form,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";
const emailValidation = (value) =>
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
    value
  );

export default function Login() {
  const [registerEmail, setRegisterEmail] = React.useState("");
  const [registerEmailState, setRegisterEmailState] = React.useState(true);
  const [registerPassword, setRegisterPassword] = React.useState("");
  const [registerPasswordState, setRegisterPasswordState] = React.useState(
    true
  );
  const [registerConfirmPassword, setRegisterConfirmPassword] = React.useState(
    ""
  );
  const [
    registerConfirmPasswordState,
    setRegisterConfirmPasswordState,
  ] = React.useState(true);
  const [loginEmail, setLoginEmail] = React.useState("");
  const [loginEmailState, setLoginEmailState] = React.useState(true);
  const [loginPassword, setLoginPassword] = React.useState("");
  const [loginPasswordState, setLoginPasswordState] = React.useState(true);
  const isNumber = (value) => !isNaN(value) && value !== "";
  const minLength = (value, length) => value.length >= length;
  const maxLength = (value, length) => value.length <= length && value !== "";
  const range = (value, min, max) => min <= value && value <= max;
  const minValue = (value, min) => min <= value;
  const maxValue = (value, max) => max >= value;
  return (
    <>
      <Form action="" id="LoginValidation" method="">
      <Card>
        <Card.Header>
          <Card.Title as="h4" className="text-center">
            Login Form
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <Form.Group
            className={
              "has-label " + (loginEmailState ? "has-success" : "has-error")
            }
          >
            <label>
              Email Address <span className="star">*</span>
            </label>
            <Form.Control
              name="email"
              type="text"
              value={loginEmail}
              onChange={(e) => {
                setLoginEmail(e.target.value);
                if (emailValidation(e.target.value)) {
                  setLoginEmailState(true);
                } else {
                  setLoginEmailState(false);
                }
              }}
            ></Form.Control>
            {loginEmailState ? null : (
              <label className="error">This field is required.</label>
            )}
          </Form.Group>
          <Form.Group
            className={
              "has-label " + (loginPasswordState ? "has-success" : "has-error")
            }
          >
            <label>
              Password <span className="star">*</span>
            </label>
            <Form.Control
              name="password"
              type="password"
              value={loginPassword}
              onChange={(e) => {
                setLoginPassword(e.target.value);
                if (minLength(e.target.value, 1)) {
                  setLoginPasswordState(true);
                } else {
                  setLoginPasswordState(false);
                }
              }}
            ></Form.Control>
            {loginPasswordState ? null : (
              <label className="error">This field is required.</label>
            )}
          </Form.Group>
          <div className="card-category form-category">
            <span className="star">*</span>
            Required fields
          </div>
        </Card.Body>
        <Card.Footer className="text-center">
          <Button
            className="btn-fill btn-wd"
            variant="info"
            onClick={() => {
              if (!loginEmailState || !emailValidation(loginEmail)) {
                setLoginEmailState(false);
              } else {
                setLoginEmailState(true);
              }
              if (!loginPasswordState || !minLength(loginPassword, 1)) {
                setLoginPasswordState(false);
              } else {
                setLoginPasswordState(true);
              }
            }}
          >
            Register
          </Button>
        </Card.Footer>
      </Card>
    </Form>
    </>
    
  );
}
