import React, { Component } from "react";
import "../ForgotPasword/ForgotPassword.css";
import {
  validatePassword,
  validateConfirmPassword,
} from "../Validation/ValidateProperties";
import { ErrorMsg } from "../Validation/ErrorMsg";
import { Col, Navbar } from "react-bootstrap";
import logo from "../../../Raj/images/logo.png";
import MediaQuery from "react-responsive";
import axios from "axios";

export class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      confirmPassword: "",
      error: {},
      isPasswordValid: false,
      isConfirmPasswordValid: false,
      isFormValid: false,
    };
  }

  redirectToLogin = () => {
    this.props.history.push("/login");
  };

  updateProperties(name, value) {
    switch (name) {
      case "password":
        this.setState({ [name]: value }, validatePassword);
        break;
      case "confirmPassword":
        this.setState({ [name]: value }, validateConfirmPassword);
        break;
      default:
        break;
    }
  }

  validateForm = () => {
    const { isPasswordValid, isConfirmPasswordValid } = this.state;
    this.setState({
      isFormValid: isPasswordValid && isConfirmPasswordValid,
    });
  };

  updatePassword = (e) => {
    e.preventDefault();
    // console.log("In updatePassword: " + JSON.stringify(this.props));
    const _userId = this.props.match.params.userId;
    const { password } = this.state;
    console.log("In updatePassword _userId: " + _userId);
    console.log("In updatePassword: " + password);
    const resetPssURL = `https://eventgoapi.herokuapp.com/usermng/resetpassword/${_userId}`;
    // const resetPssURL = `http://localhost:8080/usermng/resetpassword/${_userId}`;
    console.log("In updatePassword: " + resetPssURL);
    axios
      .put(resetPssURL, { password })
      .then((res) => {
        let resultData = res.data;
        console.log(resultData);
        if (resultData == true) {
          alert("Password is successfully Reset!!\nPlease login.");
          this.redirectToLogin();
        } else {
          alert(
            "Error from server updating password.\n Please contact RideShare."
          );
        }
      })
      .catch((err) =>
        console.warn("ERROR FROM SERVER UPDATING PASSWORD:", err)
      );
  };

  render() {
    console.log("Reset Passsowrd called!");
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
          <header className="header justify-content-center">
            <h3>Reset Password</h3>
          </header>
          <section className="card forgot-password-card mt-2 hv-center">
            <form className="form">
              <br />
              <section className="form-group text-left">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter a new password"
                  value={this.state.password}
                  onChange={(e) =>
                    this.updateProperties("password", e.target.value)
                  }
                />
                <ErrorMsg
                  valid={this.state.isPasswordValid}
                  message={this.state.error.password}
                />
              </section>

              <section className="form-group text-left">
                <label htmlFor="password">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Confirm a new password"
                  value={this.state.confirmPassword}
                  onChange={(e) =>
                    this.updateProperties("confirmPassword", e.target.value)
                  }
                />
                <ErrorMsg
                  valid={this.state.isConfirmPasswordValid}
                  message={this.state.error.confirmPassword}
                />
              </section>

              <section>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={!this.state.isFormValid}
                  onClick={this.updatePassword}
                >
                  Reset Passowrd
                </button>
              </section>
            </form>
            <br />
            <br />
            <section
              type="submit"
              className="btn-custom"
              onClick={this.redirectToLogin.bind(this)}
            >
              <strong>Back to Login</strong>
            </section>
          </section>
        </Col>
      </section>
    );
  }
}
