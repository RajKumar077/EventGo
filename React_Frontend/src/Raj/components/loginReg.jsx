/* @Author - password Makwana B00842568 */
//@Author - RajKumar B00849566

import React, { Component } from "react";
import Login from "./login";
import Register from "./register";
import Description from "./description";
import { Form, Button, Col, Container, Row } from "react-bootstrap";
import "./events.css";

class LoginAndReg extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Login />

        <Row style={{ width: "100%" }}>
          <Col>
            <Description />
          </Col>
          <Col>
            <Register />
          </Col>
        </Row>
        <br />
      </div>
    );
  }
}

export default LoginAndReg;
