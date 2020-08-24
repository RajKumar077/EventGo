/* @Author - password Makwana B00842568 */
//@Author - RajKumar B00849566
import React, { Component } from "react";
import { Form, Button, Col, Container, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./events.css";
import moment from "moment";
import axios from "axios";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      dob: "",
      gender: "",
      validated: false,
      invalidPwd: false,
      invalidEmail: false,
      isValid: false,
    };
  }

  //user name change event
  onUserNameChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });
  };

  //Password validation goes here
  onPasswordEnter = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    if (value.length > 4) {
      this.setState({ invalidPwd: false });
    } else {
      this.setState({ invalidPwd: true });
    }
    this.setState({ [name]: value });
  };

  //Email Id validation goes here
  onEmailChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(String(value).toLowerCase())) {
      this.setState({ invalidEmail: false });
    } else {
      this.setState({ invalidEmail: true });
    }
    this.setState({ [name]: value });
  };

  //DOJ change event
  onDateChange = (date) => {
    // console.log(date);
    this.setState({
      dob: date,
    });
  };

  //Gender dropdown
  onGenderChange = (event) => {
    this.setState({ gender: event.target.value });
  };

  //Register button click event
  mySubmitHandler = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const { invalidPwd, invalidEmail, username } = this.state;
    // console.log(invalidPwd,invalidEmail)
    if (form.checkValidity() === false || invalidPwd || invalidEmail) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      let selectedDateStr = moment(this.state.dob).format("DD.MM.YYYY");
      const user = {
        username: this.state.username,
        password: this.state.password,
        email: this.state.email,
        dob: selectedDateStr,
        gender: this.state.gender,
      };
      // console.log(user);
      let url = "https://eventgoapi.herokuapp.com/usermng/registerUser";
      // let url = "http://localhost:8080/usermng/registerUser";
      axios
        .post(url, { user })
        .then((res) => {
          // console.log(res);
          // console.log(res.data);
          if (res.data.length == 0) {
            this.setState({ isValid: false });
            alert(
              "Email Id is already registered with us.\n" +
                "Please try a new email id."
            );
          } else {
            this.setState({ isValid: true });
            alert("Registration successful!\n" + "Please Log In.");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    this.setState({ validated: true });
  };

  render() {
    const myBordeSrtyle = {
      width: "100%",
      height: "100%",
      backgroundColor: "#c3c6d8",
      borderRadius: "7px",
    };

    let pwdbstyle = this.state.invalidPwd
      ? "invalidValuebStyle"
      : "validValuebStyle";
    let emailbstyle = this.state.invalidEmail
      ? "invalidValuebStyle"
      : "validValuebStyle";
    let errMsgPwd = this.state.invalidPwd ? (
      <span style={{ fontStyle: "italic" }}>
        <small className="text-muted">
          Password must be atleast 5 Characters long
        </small>
      </span>
    ) : null;
    let errMsgEmail = this.state.invalidEmail ? (
      <span style={{ fontStyle: "italic" }}>
        <small className="text-muted">Please enter a valid email address</small>
      </span>
    ) : null;

    return (
      <div style={{ height: "100%" }}>
        <br />
        <Col style={{ height: "100%" }}>
          <Container style={myBordeSrtyle}>
            <h2>Create new account</h2>
            <Form
              noValidate
              validated={this.state.validated}
              onSubmit={this.mySubmitHandler}
            >
              <Form.Group as={Row} controlId="usrname">
                <Form.Label column sm="3.5" className="loginLabel">
                  Name:
                </Form.Label>
                <Col sm="5">
                  <Form.Control
                    type="text"
                    placeholder=""
                    name="username"
                    value={this.state.username}
                    onChange={this.onUserNameChange}
                    required
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="pwd">
                <Form.Label column sm="3.5" className="loginLabel">
                  Password:
                </Form.Label>
                <Col sm="5">
                  <Form.Control
                    type="password"
                    placeholder=""
                    name="password"
                    className={pwdbstyle}
                    value={this.state.password}
                    onChange={this.onPasswordEnter}
                    required
                  />
                </Col>
                <Col>{errMsgPwd}</Col>
              </Form.Group>

              <Form.Group as={Row} controlId="em">
                <Form.Label column sm="3.5" className="loginLabel">
                  Email:
                </Form.Label>
                <Col sm="5">
                  <Form.Control
                    type="text"
                    placeholder=""
                    name="email"
                    value={this.state.email}
                    onChange={this.onEmailChange}
                    required
                    className={emailbstyle}
                  />
                </Col>
                <Col>{errMsgEmail}</Col>
              </Form.Group>

              <Form.Group as={Row} controlId="date">
                <Form.Label column sm="3.5" className="loginLabel">
                  Date of birth:
                </Form.Label>
                <Col sm="5">
                  <DatePicker
                    className="calenderpicker form-control"
                    selected={this.state.dob}
                    onChange={this.onDateChange}
                    value={this.state.dob}
                    dateFormat="dd.MM.yyyy"
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="gender">
                <Form.Label column sm="3.5" className="loginLabel">
                  Gender:
                </Form.Label>
                <Col sm="5">
                  <Form.Control
                    as="select"
                    value={this.state.gender}
                    onChange={this.onGenderChange}
                    required
                  >
                    <option value="">Choose...</option>
                    <option value="ma">Male</option>
                    <option value="fe">Female</option>
                    <option value="ot">Other</option>
                  </Form.Control>
                </Col>
              </Form.Group>
              <div style={{ paddingLeft: "27%" }}>
                <Button variant="primary" type="submit">
                  Register
                </Button>
              </div>
            </Form>
          </Container>
        </Col>
      </div>
    );
  }
}

export default Register;
