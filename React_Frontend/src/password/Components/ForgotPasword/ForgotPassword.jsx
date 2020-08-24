import React, { Component } from "react";
import "./ForgotPassword.css";
import { validateEmail } from "../Validation/ValidateProperties";
import { ErrorMsg } from "../Validation/ErrorMsg";
import { Button, Col, Form, Navbar, Row } from "react-bootstrap";
import logo from "../../../Raj/images/logo.png";
import MediaQuery from "react-responsive";
import axios from "axios";

export class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      error: {},
      isEmailValid: false,
      isFormValid: false,
    };
  }

  redirectToLogin = () => {
    this.props.history.push("/login");
  };

  redirectToResetPassword = () => {
    alert("Password Reset Link is sent to the email id.");
    this.props.history.push("/resetpassword");
  };

  updateEmail(name, value) {
    this.setState({ [name]: value }, validateEmail);
  }

  validateForm = () => {
    const { isEmailValid } = this.state;
    this.setState({
      isFormValid: isEmailValid,
    });
  };

  resetLinkSent = (e) => {
    e.preventDefault();
    console.log("resetLinkSent function called");
    const user = {
      email: this.state.email,
    };
    console.log(user);
    console.log(user.email);
    let url = "https://eventgoapi.herokuapp.com/usermng/forgotPassword";
    // let url = "http://localhost:8080/usermng/forgotPassword";
    axios
      .post(url, { user })
      .then((res) => {
        let resultData = res.data;
        console.log(resultData);
        if (resultData.length > 0) {
          alert("Password Reset Link Sent to registered email id!");
        } else {
          alert("Email Id is not registered with RideShare.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    console.log("Forgot Passsowrd called!");
    return (
      <section>
        <header>
          <Navbar className="navbg">
            <Col align="center">
              <Navbar.Brand href="login">
                <img src={logo} alt="logo" style={{ height: "135px" }} />
                <MediaQuery maxWidth="500px">
                  {(matches) =>
                    matches ? null : (
                      <strong
                        style={{ fontFamily: "unset", fontSize: "xxx-large" }}
                      >
                        RideShare
                      </strong>
                    )
                  }
                </MediaQuery>
              </Navbar.Brand>
            </Col>
          </Navbar>
        </header>

        <Col align="center">
          <br />
          <header className="header" align="center">
            <h3>Forgot Password</h3>
          </header>
          <section className="card forgot-password-card">
            <form className="form">
              <br />
              <section className="form-group text-left">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email address"
                  value={this.state.email}
                  onChange={(e) => this.updateEmail("email", e.target.value)}
                />
                <ErrorMsg
                  valid={this.state.isEmailValid}
                  message={this.state.error.email}
                />
              </section>

              <section>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={!this.state.isFormValid}
                  onClick={this.resetLinkSent}
                >
                  Send Password Reset Link
                </button>
              </section>
            </form>
            <br />
            <br />
            <footer
              type="submit"
              className="btn-custom"
              onClick={this.redirectToLogin.bind(this)}
            >
              <strong>Back to Login</strong>
            </footer>
          </section>
        </Col>
      </section>
    );
  }
}
