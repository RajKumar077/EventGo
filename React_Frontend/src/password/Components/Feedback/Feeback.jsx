import React, { Component } from "react";
import "../ForgotPasword/ForgotPassword.css";
import { ErrorMsg } from "../Validation/ErrorMsg";
import { validateEmail } from "../Validation/ValidateProperties";
import { Col, Navbar } from "react-bootstrap";
import logo from "../../../Raj/images/logo.png";
import MediaQuery from "react-responsive";

export class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      feedback: "",
      error: {},
      isEmailValid: false,
      isFormValid: false,
    };
  }

  redirectToHome = () => {
    this.props.history.push("/home");
  };

  feedbackSubmitted = (e) => {
    e.preventDefault();
    console.log("Function called");
    this.setState({
      email: "",
      feedback: "",
      error: {},
      isEmailValid: false,
      isFormValid: false,
    });
    alert(
      "Here dialog with below confirmation will be implemented\n " +
        "Feedback submitted successfully!\n Thank You."
    );
  };

  updateProperties(name, value) {
    switch (name) {
      case "email":
        this.setState({ [name]: value }, validateEmail);
        break;
      case "feedback":
        this.setState({ [name]: value });
        break;
      default:
        break;
    }
  }

  validateForm = () => {
    const { isEmailValid } = this.state;
    this.setState({
      isFormValid: isEmailValid,
    });
  };

  render() {
    console.log("Feedback called!");
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
          <header className="header justify-content-center">
            <h3>Give Us Feedback</h3>
          </header>
          <section className="card forgot-password-card mt-2 hv-center">
            <form className="form">
              <br />
              <section className="form-group text-left">
                <label htmlFor="exampleInputEmail1">Enter your email id</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email id"
                  value={this.state.email}
                  onChange={(e) =>
                    this.updateProperties("email", e.target.value)
                  }
                />
                <ErrorMsg
                  valid={this.state.isEmailValid}
                  message={this.state.error.email}
                />
              </section>

              <section className="form-group text-left">
                <label htmlFor="exampleInputEmail1">Feedback</label>
                <textarea
                  type="feedback"
                  className="form-control"
                  id="feedback"
                  placeholder="Please enter the feedback here"
                  value={this.state.feedback}
                  onChange={(e) =>
                    this.updateProperties("feedback", e.target.value)
                  }
                />
              </section>

              <section>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={!this.state.isFormValid}
                  onClick={this.feedbackSubmitted}
                >
                  Submit
                </button>
              </section>
            </form>
            <br />
            <br />
            <footer
              type="submit"
              className="btn-custom"
              onClick={this.redirectToHome.bind(this)}
            >
              <strong>Back to Home</strong>
            </footer>
          </section>
        </Col>
      </section>
    );
  }
}
