import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

class FormUsersDetails extends Component {
  continue = (e) => {
    e.preventDefault();
    if (this.inputValidation()) {
      this.props.nextStep();
    }
  };

  inputValidation = () => {
    const { firstName, lastName, email } = this.props.values;

    const regName = /^[a-zA-Z ]{2,30}$/;
    const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!regName.test(String(firstName))) {
      alert("Invalid First Name");
      return false;
    }
    if (!regName.test(String(lastName))) {
      alert("Invalid Last Name");
      return false;
    }
    if (!regEmail.test(String(email).toLowerCase())) {
      alert("Invalid Email address");
      return false;
    }

    return true;
  };

  render() {
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <TextField
            hintText="Enter your First Name"
            floatingLabelText="FirstName"
            onChange={this.props.changeHandler("firstName")}
            defaultValue={this.props.values.firstName}
          />
          <br />
          <TextField
            hintText="Enter your Last Name"
            floatingLabelText="Last Name"
            onChange={this.props.changeHandler("lastName")}
            defaultValue={this.props.values.lastName}
          />
          <br />
          <TextField
            hintText="Enter your Email"
            floatingLabelText="Email"
            onChange={this.props.changeHandler("email")}
            defaultValue={this.props.values.email}
          />
          <br />
          <RaisedButton
            label="Continue"
            primary={true}
            onClick={this.continue}
            style={styles.button}
          />
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

const styles = {
  button: {
    margin: 15,
  },
};

export default FormUsersDetails;
