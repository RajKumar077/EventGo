// importing all the required packages.
import React, { Component } from "react";
import { Col, Form, Navbar } from "react-bootstrap";
import emailjs from "emailjs-com";
import axios from "axios";
import Cookies from "js-cookie";

export class Feedback extends Component {
  constructor(props) {
    super(props);
    const email = Cookies.get("email");

    this.state = {
      email: "",
      feedback: "",
      error: {},
      validateEmailMsg: "",
      validateFeedbackMsg: "",
    };
  }

  // Below function will redirect user to home when clicked on "return to Home" button.
  redirectToHome = () => {
    this.props.history.push("/home");
  };

  // Below function will invoke when user provides the email id.
  emailIdFun = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  // Below function will invoke when user provides the feedback message
  feedbackFun = (event) => {
    this.setState({
      feedback: event.target.value,
    });
  };

  /* 
        Below function will invoke when user clicks on Submit button.
        User will first get valided based on the email address provided.
        Further if the validation is done then the email id and feedback
        message will be stored in the database and an email will be sent 
        to "ridesharecomp@gmail.com"
    */
  feedbackSubmitted = (event) => {
    let validateEmailMsg = "";
    let validateFeedbackMsg = "";
    let mess1 = false;
    let mess2 = false;

    event.preventDefault();

    emailjs
      .sendForm(
        "gmail",
        "rideshare",
        event.target,
        "user_SZchUn5ka0898AwI2Yq1S"
      )
      .then(
        (result) => {},
        (error) => {
          console.log(error.text);
        }
      );

    if (this.state.feedback.length === 0 || this.state.feedback.trim() === "") {
      validateFeedbackMsg =
        "Feedback field cannot be empty. Please provide feedback";
      mess1 = false;
      if (validateFeedbackMsg) {
        this.setState({ validateFeedbackMsg });
      }
    } else {
      this.setState({ validateFeedbackMsg });
      mess1 = true;
    }

    if (this.state.email.includes("@") && this.state.email.includes(".")) {
      this.setState({ validateEmailMsg });
      mess2 = true;
    } else {
      validateEmailMsg = "Email Id is invalid. Please provide valid Email Id";
      mess2 = false;
      if (validateEmailMsg) {
        this.setState({ validateEmailMsg });
      }
    }

    const mydata = {
      email: this.state.email,
      feedback: this.state.feedback,
    };
    console.log(mydata);
    let url = "https://eventgoapi.herokuapp.com/insertFeedback/insertFeedback";
    //let url = "http://localhost:8080/insertFeedback/insertFeedback";
    axios
      .post(url, mydata)
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    if (mess1 && mess2 === true) {
      alert("Your feedback has been successfully inserted in the database.");
    } else {
      alert("Sorry, your feedback cannot be inserted.");
    }
  };

  render() {
    console.log("Feedback called!");
    return (
      <section>
        <Col align="center">
          <br />
          <header className="header justify-content-center">
            <h3>Give Us Feedback</h3>
          </header>
          <section className="card" style={{ width: "35%" }}>
            <div className="card-body">
              <form className="form" onSubmit={this.feedbackSubmitted}>
                <br />
                <section className="form-group text-left">
                  <label>Enter your email id</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Enter your email id"
                    value={this.state.email}
                    onChange={this.emailIdFun}
                  />
                  <div style={{ fontSize: 12, color: "red" }}>
                    {this.state.validateEmailMsg}
                  </div>
                </section>

                <section className="form-group text-left">
                  <label htmlFor="exampleInputEmail1">Feedback</label>
                  <textarea
                    type="feedback"
                    className="form-control"
                    name="feedback"
                    placeholder="Please enter the feedback here"
                    value={this.state.feedback}
                    onChange={this.feedbackFun}
                  />
                  <div style={{ fontSize: 12, color: "red" }}>
                    {this.state.validateFeedbackMsg}
                  </div>
                </section>

                <section>
                  <button type="submit" className="btn btn-primary">
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
            </div>
          </section>
        </Col>
      </section>
    );
  }
}
export default Feedback;
