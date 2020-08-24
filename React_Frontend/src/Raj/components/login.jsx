/* @Author - password Makwana B00842568 */
//@Author - RajKumar B00849566

import React, { Component } from "react";
import MediaQuery from "react-responsive";
import { Navbar, Nav } from "react-bootstrap";
import { Form, Button, Col, Row } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import "./events.css";
import logo from "../images/logo_white.png";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isLoggedIn: false,
      isInvalidCred: false,
    };
  }

  //Login button click handler
  mySubmitHandler = (event) => {
    event.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    // console.log(user);
    let url = "https://eventgoapi.herokuapp.com/usermng/login";
    //let url = "http://localhost:8080/usermng/login";
    axios
      .post(url, { user })
      .then((res) => {
        let resultData = res.data;
        //console.log(resultData);
        //console.log("This is result resultData.length): " + resultData.length);
        if (resultData.length > 0) {
          Cookies.remove("userId");
          Cookies.remove("userName");
          Cookies.remove("email");
          //costestimator
          Cookies.set("isPremium", resultData[0].isPremium);
          //
          Cookies.set("userId", resultData[0].userId);
          Cookies.set("userName", resultData[0].userName);
          Cookies.set("email", user.email);
          this.setState({ isLoggedIn: true, isInvalidCred: false });
          // console.log("This is isLoggedIn: " + this.state.isLoggedIn);
          // console.log("This is isInvalidCred: " + this.state.isInvalidCred);
          // console.log("This is state: " + this.state);
        } else {
          this.setState({ isInvalidCred: true });
          //console.log("This is isInvalidCred: " + this.state.isInvalidCred);
          throw new Error("Bad response from server");
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isInvalidCred: true });
      });
  };

  //fields change
  onFieldChange = (event) => {
    let usr = event.target.name;
    let val = event.target.value;
    this.setState({ [usr]: val });
  };

  render() {
    //console.log("This is isLoggedIn in render: " + this.state.isLoggedIn);
    if (this.state.isLoggedIn) {
      return <Redirect to="/findevent" />;
    }

    let errMsg = this.state.isInvalidCred ? (
      <span style={{ fontStyle: "italic", color: "#dc3545" }}>
        <span style={{ fontWeight: "bold" }}>Invalid email or password</span>
      </span>
    ) : null;
    return (
      <Navbar className="navbgLogin">
        <Col>
          <Navbar.Brand href="login">
            <img src={logo} alt="logo" style={{ height: "135px" }} />
            <MediaQuery maxWidth="690px">
              {(matches) =>
                matches ? null : (
                  <strong
                    style={{
                      fontFamily: "unset",
                      fontSize: "xxx-large",
                      color: "white",
                    }}
                  >
                    RideShare
                  </strong>
                )
              }
            </MediaQuery>
          </Navbar.Brand>
        </Col>
        <Col>
          <Form onSubmit={this.mySubmitHandler} className="loginForm">
            <Form.Group as={Row} controlId="usr">
              <Form.Label
                column
                sm="3.5"
                className="loginLabel"
                style={{ color: "white" }}
              >
                Email Id:
              </Form.Label>
              <Col sm="5">
                <Form.Control
                  type="text"
                  placeholder=""
                  name="email"
                  value={this.state.email}
                  onChange={this.onFieldChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="pwd">
              <Form.Label
                column
                sm="3.5"
                className="loginLabel"
                style={{ color: "white" }}
              >
                Password:
              </Form.Label>
              <Col sm="5">
                <Form.Control
                  type="password"
                  placeholder=""
                  name="password"
                  value={this.state.password}
                  onChange={this.onFieldChange}
                />
                {errMsg}
              </Col>
            </Form.Group>
            <div style={{ paddingLeft: "27%" }}>
              <Row>
                <Col sm="2">
                  <Button variant="primary" type="submit">
                    Login
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col>
                  <a href="/forgotpassword" style={{ color: "white" }}>
                    Forgot Password?
                  </a>
                </Col>
              </Row>
            </div>
          </Form>
        </Col>
      </Navbar>
    );
  }
}

export default Login;
